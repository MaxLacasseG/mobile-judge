const logger = require("tracer").colorConsole();
const uuidv4 = require("uuid/v4");
const isEmpty = require("../utils/isEmpty");
const emailUtil = require("../utils/emailUtil");
const Admin = require("../models/Admin");
const Judge = require("../models/Judge");

const bcrypt = require("bcrypt");
const controller = {};
const JWT = require("jsonwebtoken");
const keys = require("../config/keys");

controller.CreateJudge = async userInfos => {
	//Check if final exist
	//Check if judge number and username exist
	//Validate info
	//if not, create user and saves it
};

controller.RegisterAdmin = adminInfos => {
	//Checks if email exist
	return controller.CheckIfEmailExist(adminInfos.email).then(emailExist => {
		if (emailExist) {
			throw {
				success: false,
				email: "Utilisateur existant"
			};
		}

		const admin = new Admin(adminInfos);

		return admin.save();
	});
};

controller.EmailPwdUpdate = user => {
	const mailOptions = {
		to: user.courriel,
		from: "nepasrepondre@technoscience.ca",
		subject: "APPLICATION STATISTIQUES - Création d'un utilisateur",
		html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head> 
            
                    
            </head>
            <body>
            <div style='padding:10px;background-color:rgb(4, 108, 172);'>
            <h1 style='color:white; text-transform:uppercase; font-size:1em;'>Réseau Technoscience - Jugement mobile</h1> 
            </div>
			<p>Votre compte pour l'application statistiques a bien été créé. Vous devrez modifier votre mot de passe lors de votre première connexion.</p> 
			<p>Nom d'utilisateur: ${user.courriel}</p>
			<p>Mot de passe temporaire: ${user.mdp}</p>
			<p><a href="http://jugement.technoscience.ca"><strong>Se connecter au site</strong></a></p>
			<footer style='background-color:rgb(4, 108, 172); color:white !important; padding:30px'>Si vous avez des difficultés à vous connecter, veuillez communiquer avec <a href='mailto://mlacassegermain@technoscience.ca' style:'color:white'>Maxime Lacasse Germain</a></footer>
            </body>
            </html>`
	};

	emailUtil.send(mailOptions, err => {
		if (err) throw err;
		return {
			success: true,
			msg: "Un message a été envoyé par courriel"
		};
	});
};

controller.InitPwd = newInfos => {
	return controller
		.FindById(newInfos._id)
		.then(foundUser => {
			foundUser.pwd = newInfos.pwd;
			return foundUser.save();
		})
		.then(savedUser => {
			savedUser.newAdmin = false;
			delete savedUser.pwd;
			return controller.UpdateOne(savedUser);
		})
		.then(noFlagUser => {
			console.log(noFlagUser);
			delete noFlagUser.pwd;
			return noFlagUser;
		})
		.catch(err => {
			throw err;
		});
};

controller.ConnectAdmin = credentials => {
	//Check if super admin
	return Admin.findOne({ email: credentials.email })
		.then(admin => {
			//If user is not found in DB
			if (isEmpty(admin)) throw { success: false, email: "Utilisateur inconnu" };

			return {
				isMatch: bcrypt.compareSync(credentials.pwd, admin.pwd),
				user: admin
			};
		})
		.then(result => {
			//If pwd incorrect
			if (!result.isMatch) throw { success: false, pwd: "Mot de passe erroné." };
			const { _id, email, firstName, lastName, phone, isAdmin, newAdmin } = result.user;
			// Object to be added to the token
			const payload = {
				id: _id,
				email,
				firstName,
				lastName,
				phone,
				isAdmin,
				newAdmin,
				type: isAdmin ? "SUPER_ADMIN" : "ADMIN"
			};

			//Create the token, expires after 1 hour
			const token = JWT.sign(payload, process.env.SECRETORKEY, {
				expiresIn: 3600
			});

			if (!token) {
				throw { success: false, msg: "Impossible de générer le jeton" };
			}

			//Return token
			return {
				success: true,
				msg: "Connecté",
				token: "Bearer " + token
			};
		})
		.catch(err => {
			throw err;
		});
};

controller.ConnectUser = credentials => {
	switch (credentials.type) {
		case "ADMIN":
			return controller.ConnectAdmin(credentials);
		case "JUDGE":
			return controller.ConnectJudge(credentials);
		default:
			return { msg: "ERREUR CONNEXION | Type d'utilisateur inconnu" };
	}
};

controller.CheckIfEmailExist = email => {
	return Admin.find({ email: email.toLowerCase().trim() })
		.then(utilisateurs => {
			return utilisateurs.length > 0;
		})
		.catch(err => {
			throw err;
		});
};

controller.Invite = function(data) {
	return controller
		.emailInUse(data.username)
		.then(function(inUse) {
			if (inUse) {
				throw {
					title: i18n.__("common.error"),
					msg: i18n.__("signup.alreadyExists")
				};
			}
			var user = new Admin(data);
			var email = user.username.toLowerCase().trim();
			user.emails.push({ email: email, confirmed: false });

			return user.save();
		})
		.then(function(user) {
			return controller.sendInvite(
				user,
				user.username,
				data.email,
				data.program || {},
				data.event
			);
		});
};

controller.Find = filter => {
	return Admin.find(filter)
		.select(["-pwd", "-resetToken", "-resetTokenExpired"])
		.sort({ isAdmin: 1, lastName: 1 });
};

controller.FindById = id => {
	return Admin.findById(id);
};

controller.UpdateOne = adminInfos => {
	return Admin.findByIdAndUpdate(adminInfos._id, adminInfos);
};

controller.CheckForgottenPwd = (email, host) => {
	return Admin.findOne({ email: email })
		.then(utilisateur => {
			//Creation d'un token réinitialisation
			if (!utilisateur) {
				throw { success: false, msg: "courriel inexistant" };
			}
			utilisateur.resetToken = uuidv4();
			utilisateur.resetTokenExpired = Date.now() + 360000;
			return utilisateur.save();
		})
		.then(user => {
			//REFORMATER LE COURRIEL
			//Envoi d'un courriel de réinitialisation --> Infos du courriel dans le dossier CONFIG
			const mailOptions = {
				to: user.email,
				from: keys.nodeMailerConfig.auth.user,
				subject: "JUGEMENT MOBILE - Réinitialisation du mot de passe",
				text:
					"Vous recevez ce courriel car vous (ou quelqu'un) a demandé de réinitialiser votre mot de passe pour l'application de jugement \n\n" +
					"Cliquez sur le lien suivant pour réinitialiser votre mot de passe:\n\n" +
					"http://localhost:3000/modification-mot-de-passe/" +
					user.resetToken +
					"\n\n" +
					"Si vous n'avez pas demandé de changement, ignorez ce courriel et votre mot de passe demeurera inchangé.\n"
			};

			emailUtil.send(mailOptions, err => {
				if (err) throw err;
				return {
					success: true,
					msg: "Un message a été envoyé par courriel"
				};
			});
		})
		.catch(err => {
			throw err;
		});
};

controller.FindResetToken = resetToken => {
	return Admin.findOne({ resetToken });
};

controller.ResetPwd = (user, mdp) => {
	user.mdp = mdp;
	user.resetToken = null;
	user.resetTokenExpired = null;
	return user.save();
};

controller.DeleteOne = adminId => {
	return Admin.findByIdAndRemove(adminId);
};

controller.DeleteAll = () => {
	return Admin.deleteMany({})
		.then(results => {
			return results;
		})
		.catch(err => {
			throw err;
		});
};

module.exports = controller;

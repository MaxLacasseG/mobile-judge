const logger = require("tracer").colorConsole();
//const emailUtil = require("../utils/email");
const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const controller = {};
const JWT = require("jsonwebtoken");
const keys = require("../config/keys");
// @param {object}			data: Les infos fournis par le formulaire d'inscription
// @return {err, result}	result: L'utilisateur enregistré
//							err: L'erreur s'il y a lieu
controller.creer = async data => {
    //TODOS:VALIDATION
    return await controller
        .courrielExistant(data.courriel)
        .then(async courrielExiste => {
            if (courrielExiste) {
                return await {
                    success: false,
                    courriel: "Utilisateur existant"
                };
            }
            return await new Promise((resolve, reject) => {
                bcrypt.hash(data.mdp, saltRounds, (err, hash) => {
                    if (err) reject(err);
                    const utilisateur = new Utilisateur(data);
                    utilisateur.courriel = utilisateur.courriel
                        .toLowerCase()
                        .trim();
                    utilisateur.mdp = hash;
                    const result = utilisateur.save();
                    resolve(result);
                });
            });
        });
};

controller.connexion = data => {
    //VALIDATION
    return controller
        .rechercher(data.courriel)
        .then(utilisateur => {
            return new Promise((resolve, reject) => {
                bcrypt.compare(data.mdp, utilisateur.mdp, (err, result) => {
                    if (err) reject(err);
                    else {
                        if (result) {
                            const payload = {
                                id: utilisateur._id,
                                courriel: utilisateur.courriel,
                                prenom: utilisateur.prenom,
                                nom: utilisateur.nom,
                                regions: utilisateur.regions,
                                admin: utilisateur.admin
                            };
                            JWT.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    resolve({
                                        success: true,
                                        msg: "Connecté",
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        } else {
                            reject(false);
                        }
                    }
                });
            });
        })
        .catch(err => {
            throw err;
        });
};

// @param  {string} 	courriel
// @return {bool}	Retourne si le courriel existe dans la bdd ou non
controller.courrielExistant = async courriel => {
    return await Utilisateur.find(
        {
            courriel: courriel.toLowerCase().trim()
        },
        null
    ).then(async utilisateurs => {
        return (await utilisateurs.length) > 0;
    });
};

controller.inviter = function(data) {
    return controller
        .emailInUse(data.username)
        .then(function(inUse) {
            if (inUse) {
                throw {
                    title: i18n.__("common.error"),
                    msg: i18n.__("signup.alreadyExists")
                };
            }
            var user = new User(data);
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

controller.rechercher = courriel => {
    return Utilisateur.findOne({ courriel: courriel });
};

controller.rechercherParId = id => {
    return Utilisateur.findById(id);
};

/* 
controller.sendConfirm = function(user, addresse) {
	var email = _.find(user.emails, {'email' : addresse});
	if (!email) {
		promise.reject({title: i18n.__('common.error'), msg : i18n.__('confirm.notAssociated')});
		return promise;
	}
	email.confirmCode = rack();
	return user.save()
	.then(function() {
		return emailUtil.send(email.email, user.firstName + ' ' + user.lastName, i18n.__('confirm.subject'), i18n.__('confirm.body',  {name: user.firstName + ' ' + user.lastName,url:network.getFullURL()+ "/users/confirm/" + email.confirmCode}));
	})
	.then(function() {
		return user;
	})
}

controller.sendInvite = function(user, addresse, email, program, eventName) {
	user.inviteCode = rack();
	return user.save()
	.then(function() {
		return emailUtil.send(user.username, user.firstName + ' ' + user.lastName, i18n.__('invite.subject.'+email, {event: eventName}), i18n.__('invite.body.'+email,  {name: user.firstName + ' ' + user.lastName, program: program.name, url: network.getFullURL()+ "/users/invite/" + user.inviteCode, event: eventName}))
	}).then(function() {
		return user;
	})
}

controller.finishInvite = function(inviteCode, data) {
	return User.findOne({inviteCode: inviteCode})
	.then(function(user) {
		user.firstName = data.firstName;
		user.lastName = data.lastName;
		user.password = data.password;
		user.inviteCode = null;
		var email = _.find(user.emails, {"email": user.username.toLowerCase().trim()});
		email.confirmed = true;
		email.confirmCode = undefined;
		return user.save();
	})
}

controller.confirm = function(confirmCode) {
	var email;
	return User.findOne({'emails.confirmCode' : confirmCode})
	.then(function(user) {
		if (!user) {
			throw {title: i18n.__('common.error'), msg : i18n.__("confirm.notFound")}
		}
		email = _.find(user.emails, {'confirmCode' : confirmCode});
		email.confirmed = true;
		email.confirmCode = undefined;
		return user.save();
	}).then(function(user) {
		var result = {};
		result.user = user;
		result.email = email.email;
		return result;
	});
} */

/* 
controller.forgotPassword = function(email) {
	return controller.find(email)
	.then(function(user) {
		if (!user) {
			throw {title: i18n.__('common.error'), msg : i18n.__("reset.notAssociated")}
		}
		user.resetCode = rack();
		return user.save();
	})
	.then(function(user) {
		return emailUtil.send(email, user.firstName + ' ' + user.lastName, i18n.__('reset.subject'), i18n.__('reset.body',  network.getFullURL()+ "/users/forgotPassword/" + user.resetCode));
	});
}

controller.findResetCode = function(resetCode) {
	return User.findOne({"resetCode" : resetCode})
}

controller.resetPassword = function(user, password) {
	return controller.find(user.username)
	.then(function(user) {
		if (!user) {
			throw {title: i18n.__('common.error'), msg : i18n.__("reset.notAssociated")};
		}
		user.password = password;
		user.resetCode = undefined;
		return user.save();
	})
}
 */
controller.update = function(user, data) {
    return controller.find(user.username).then(function(user) {
        user.firstName = data.firstName || user.firstName;
        user.lastName = data.lastName || user.lastName;
        user.birthday = data.birthday || user.birthday;
        return user.save();
    });
};

module.exports = controller;

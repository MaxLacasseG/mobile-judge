const logger = require("tracer").colorConsole();
const uuidv4 = require("uuid/v4");

const emailUtil = require("../utils/emailUtil");
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
                throw await {
                    success: false,
                    courriel: "Utilisateur existant"
                };
            }
            const utilisateur = new Utilisateur(data);
            utilisateur.courriel = utilisateur.courriel.toLowerCase().trim();

            return utilisateur.save();
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

controller.forgotPassword = (courriel, host) => {
    return controller
        .rechercher(courriel)
        .then(user => {
            if (!user) {
                throw { msg: "courriel inexistant" };
            }
            user.resetToken = uuidv4();
            user.resetTokenExpired = Date.now() + 360000;
            return user.save();
        })
        .then(user => {
            const mailOptions = {
                to: user.courriel,
                from: keys.nodeMailerConfig.auth.user,
                subject: "JUGEMENT MOBILE - Réinitialisation du mot de passe",
                text:
                    "Vous recevez ce courriel car vous (ou quelqu'un) a demandé de réinitialiser votre mot de passe pour l'application de jugement \n\n" +
                    "Cliquez sur le lien suivant pour réinitialiser votre mot de passe:\n\n" +
                    "http://" +
                    host +
                    "/reinitialiser/" +
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

controller.findResetToken = resetToken => {
    return Utilisateur.findOne({ resetToken });
};

controller.reinitMdp = (user, mdp) => {
    console.log(user, mdp);
    user.mdp = mdp;
    user.resetToken = null;
    user.resetTokenExpired = null;
    return user.save();
};

module.exports = controller;

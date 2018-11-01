const logger = require("tracer").colorConsole();
const uuidv4 = require("uuid/v4");
const isEmpty = require("../utils/isEmpty");
const emailUtil = require("../utils/emailUtil");
const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcrypt");
const controller = {};
const JWT = require("jsonwebtoken");
const keys = require("../config/keys");

controller.creer = async data => {
    //TODOS:VALIDATION
    return await controller.courrielExistant(data.courriel).then(async courrielExiste => {
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
    return Utilisateur.findOne({ courriel: data.courriel })
        .then(utilisateur => {
            if (isEmpty(utilisateur)) {
                throw { success: false, msg: "Utilisateur inconnu" };
            }
            return {
                isMatch: bcrypt.compareSync(data.mdp, utilisateur.mdp),
                utilisateur
            };
        })
        .then(result => {
            if (!result.isMatch) throw { success: false, msg: "Mot de passe erroné." };

            const payload = {
                id: result.utilisateur._id,
                courriel: result.utilisateur.courriel,
                prenom: result.utilisateur.prenom,
                nom: result.utilisateur.nom,
                telephone: result.utilisateur.telephone,
                region: result.utilisateur.region,
                isAdmin: result.utilisateur.isAdmin
            };

            const token = JWT.sign(payload, keys.secretOrKey, {
                expiresIn: 3600
            });

            if (!token) {
                throw { success: false, msg: "Impossible de générer le jeton" };
            }

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

controller.courrielExistant = courriel => {
    return Utilisateur.find({ courriel: courriel.toLowerCase().trim() })
        .then(utilisateurs => {
            return utilisateurs.length > 0;
        })
        .catch(err => {
            throw err;
        });
};

controller.assignerRegion = (utilisateurId, regionsAjout) => {
    return controller.rechercherParId(utilisateurId).then(utilisateur => {
        utilisateur.region = regionsAjout;

        return utilisateur.save();
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
            return controller.sendInvite(user, user.username, data.email, data.program || {}, data.event);
        });
};

controller.rechercher = filtre => {
    return Utilisateur.find(filtre);
};

controller.rechercherParId = id => {
    return Utilisateur.findById(id);
};

controller.oubliMdp = (courriel, host) => {
    return Utilisateur.findOne({ courriel: courriel })
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
                to: user.courriel,
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

controller.trouverReinitToken = resetToken => {
    return Utilisateur.findOne({ resetToken });
};

controller.reinitMdp = (user, mdp) => {
    user.mdp = mdp;
    user.resetToken = null;
    user.resetTokenExpired = null;
    return user.save();
};

controller.supprimerUn = utilisateurId => {
    return Utilisateur.findByIdAndDelete(utilisateurId);
};

controller.supprimerTous = () => {
    return Utilisateur.deleteMany({})
        .then(resultats => {
            return resultats;
        })
        .catch(err => {
            throw err;
        });
};

module.exports = controller;

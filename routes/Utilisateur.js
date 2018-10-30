var express = require("express");
var router = express.Router();
var passport = require("passport");
var logger = require("tracer").colorConsole();

var UtilisateurController = require("../controllers/Utilisateur");
var Utilisateur = require("../models/Utilisateur");

router.get("/tous", (req, res) => {
    ProjetController.rechercherTous()
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucun projet trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get(
    "/courriel",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        logger.trace(req.user);
        UtilisateurController.courrielExistant(req.query.courriel)
            .then(resultat => {
                res.status(200).json(resultat);
            })
            .catch(err => {
                res.status(200).json(err);
            });
    }
);

router.post("/creer", async (req, res) => {
    await UtilisateurController.creer(req.body)
        .then(async result => {
            await res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/connexion", (req, res) => {
    UtilisateurController.connexion(req.body)
        .then(resultat => {
            //logger.log(resultat);
            //TODO:Ajouter le token à passeport
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/oubli-mdp", function(req, res) {
    UtilisateurController.forgotPassword(req.body.courriel, req.headers.host)
        .then(result => {
            logger.log("mail sent", result);
            res.status(200).json({
                success: true,
                msg:
                    "Un courriel vous a été envoyé afin de réinitialiser votre mot de passe"
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/reinit-mdp", function(req, res) {
    UtilisateurController.findResetToken(req.query.token)
        .then(user => {
            if (!user) throw { msg: "Utilisateur non trouvé" };
            return UtilisateurController.reinitMdp(user, req.body.mdp);
        })
        .then(success => {
            res.status(200).json({
                success: true,
                msg: "Mot de passe modifié"
            });
        })
        .catch(err => {
            res.status(400).json({ success: false, err });
        });
});

router.put("/modifier", (req, res) => {
    ProjetController.modifier(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer/tous", (req, res) => {
    ProjetController.supprimerTous()
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer", (req, res) => {
    UtilisateurController.supprimerUn(req.query.utilisateurId)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
module.exports = router;

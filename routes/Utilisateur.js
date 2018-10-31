const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const UtilisateurController = require("../controllers/Utilisateur");

router.get("/tous", (req, res) => {
    UtilisateurController.rechercher({})
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun utilisateur trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/courriel-existant", (req, res) => {
    UtilisateurController.courrielExistant(req.query.courriel)
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun utilisateur trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(200).json(err);
        });
});

router.get("/id", (req, res) => {
    UtilisateurController.rechercherParId(req.query.utilisateurId)
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun utilisateur trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(200).json(err);
        });
});

router.get("/region", (req, res) => {
    UtilisateurController.rechercher({ region: req.query.regionId })
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun utilisateur trouvé" };

            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(200).json(err);
        });
});

router.post("/creer", (req, res) => {
    UtilisateurController.creer(req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/connexion", (req, res) => {
    UtilisateurController.connexion(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/oubli-mdp", (req, res) => {
    UtilisateurController.oubliMdp(req.body.courriel, req.headers.host)
        .then(result => {
            res.status(200).json({
                result,
                success: true,
                msg: "Un courriel vous a été envoyé afin de réinitialiser votre mot de passe"
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/reinit-mdp", (req, res) => {
    UtilisateurController.trouverReinitToken(req.query.token)
        .then(user => {
            if (!user) throw { msg: "Utilisateur non trouvé" };
            return UtilisateurController.reinitMdp(user, req.body.mdp);
        })
        .then(resultat => {
            res.status(200).json({
                resultat,
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

router.put("/assigner-region", (req, res) => {
    UtilisateurController.assignerRegion(req.query.utilisateurId, req.body.liste)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer/tous", (req, res) => {
    UtilisateurController.supprimerTous()
        .then(resultat => {
            if (isEmpty(resultat) || resultat.n === 0) {
                throw {
                    success: false,
                    msg: "Impossible de supprimer l'élément demandé."
                };
            }
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer", (req, res) => {
    UtilisateurController.supprimerUn(req.query.utilisateurId)
        .then(resultat => {
            if (isEmpty(resultat) || resultat.n === 0) {
                throw {
                    success: false,
                    msg: "Impossible de supprimer l'élément demandé."
                };
            }
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
module.exports = router;

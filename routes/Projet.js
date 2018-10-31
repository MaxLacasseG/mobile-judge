const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const ProjetController = require("../controllers/Projet");

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

router.get("/finale", (req, res) => {
    ProjetController.rechercherId(req.query.finaleId)
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucun projet trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/juge", (req, res) => {
    const filtre = { jugeId: req.query.jugeId, finaleId: req.query.finaleId };

    RegionController.rechercher(filtre)
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucun projet trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/id", (req, res) => {
    ProjetController.rechercherId(req.query.projetId)
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucun projet trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/creer", (req, res) => {
    ProjetController.creer(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
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
    ProjetController.supprimerUn(req.query.projetId)
        .then(resultat => {
            if (isEmpty(resultat)) {
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

const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const RegionController = require("../controllers/Region");

router.get("/tous", (req, res) => {
    RegionController.rechercherTous()
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucune région trouvée" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/id/:regionId", (req, res) => {
    RegionController.rechercherId(req.params.regionId)
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Région non trouvée" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/creer", (req, res) => {
    RegionController.creer(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/modifier", (req, res) => {
    RegionController.modifier(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer/tous", (req, res) => {
    RegionController.supprimerTous()
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

router.delete("/supprimer/:regionId", (req, res) => {
    RegionController.supprimerUn(req.params.regionId)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const JugeController = require("../controllers/Judge");

//Ajouter les juges non inscrit dans SGI

router.get("/tous", (req, res) => {
    JugeController.rechercherTous()
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/finale", (req, res) => {
    JugeController.rechercher({ finale: req.query.finaleId })
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun juge trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/projet", (req, res) => {
    const filtre = {
        projetId: req.query.projetId,
        finaleId: req.query.finaleId
    };

    JugeController.rechercher(filtre)
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/id", (req, res) => {
    JugeController.rechercherId(req.query.jugeId)
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun juge trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//TODO: Ajouter tous les juges par région

router.post("/creer", (req, res) => {
    JugeController.creer(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//TODO: Gérer la connexion d'un juge
router.post("/connexion", (req, res) => {});

router.put("/modifier", (req, res) => {
    JugeController.modifier(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer/tous", (req, res) => {
    JugeController.supprimerTous()
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

router.delete("/supprimer/finale", (req, res) => {
    JugeController.supprimerProjetsFinale(req.query.finaleId)
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
    JugeController.supprimerUn(req.query.jugeId)
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

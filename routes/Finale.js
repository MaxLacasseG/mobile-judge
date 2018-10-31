const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const FinaleController = require("../controllers/Finale");

router.get("/tous", (req, res) => {
    FinaleController.rechercherTous()
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucune finale trouvée" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/id", (req, res) => {
    FinaleController.rechercherId(req.query.finaleId)
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucune finale trouvée" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/actif", (req, res) => {
    FinaleController.rechercher({ isActive: true })
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucune finale trouvée" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/archive", (req, res) => {
    FinaleController.rechercher({ isActive: false })
        .then(resultat => {
            if (isEmpty(resultat))
                throw { success: false, msg: "Aucune finale trouvée" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/creer", (req, res) => {
    FinaleController.creer(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/importer-participants/:finaleId", (req, res) => {});

router.put("/modifier", (req, res) => {
    FinaleController.modifier(req.body)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/reactiver", (req, res) => {
    FinaleController.reactiver(req.query.finaleId)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//TODO:
router.put("/assigner-participants", (req, res) => {
    res.status(400).json("TODO");
});

router.delete("/archiver", (req, res) => {
    FinaleController.archiver(req.query.finaleId)
        .then(resultat => {
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/supprimer", (req, res) => {
    FinaleController.supprimerUn(req.query.finaleId)
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

router.delete("/supprimer/tous", (req, res) => {
    FinaleController.supprimerTous()
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

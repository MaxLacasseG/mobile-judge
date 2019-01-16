const router = require("express").Router();
const isEmpty = require("../utils/isEmpty");
const logger = require("tracer").colorConsole();

const AdminController = require("../controllers/Admin");

const adminConnectionValidator = require("../validators/AdminConnection");
const adminRegistrationValidator = require("../validators/AdminRegistration");

router.get("/all", (req, res) => {
    AdminController.Find({})
        .then(result => {
            if (isEmpty(result)) throw { success: false, msg: "Aucun utilisateur trouvé" };
            return res.status(200).json(result);
        })
        .catch(err => {
            logger.log(err);
            return res.status(400).json(err);
        });
});

router.get("/courriel-existant", (req, res) => {
    AdminController.courrielExistant(req.query.courriel)
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun utilisateur trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(200).json(err);
        });
});

router.get("/id", (req, res) => {
    AdminController.rechercherParId(req.query.utilisateurId)
        .then(resultat => {
            if (isEmpty(resultat)) throw { success: false, msg: "Aucun utilisateur trouvé" };
            res.status(200).json(resultat);
        })
        .catch(err => {
            res.status(200).json(err);
        });
});

router.post("/register", (req, res) => {
    //Validate && sanitize data
    const { errors, isValid, sanitizedData } = adminRegistrationValidator(req.body);
    if (!isValid) return res.status(400).json(errors);

    AdminController.RegisterAdmin(sanitizedData)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            logger.log("test");
            res.status(400).json(err);
        });
});

router.post("/connection", (req, res) => {
    //Validate && sanitize data
    const { errors, isValid, sanitizedData } = adminConnectionValidator(req.body);
    if (!isValid) return res.status(400).json(errors);

    AdminController.ConnectAdmin(sanitizedData)
        .then(resultat => {
            return res.status(200).json(resultat);
        })
        .catch(err => {
            logger.log(err);
            return res.status(400).json(err);
        });
});

router.post("/oubli-mdp", (req, res) => {
    AdminController.oubliMdp(req.body.courriel, req.headers.host)
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
    AdminController.trouverReinitToken(req.body.token)
        .then(user => {
            if (!user) throw { msg: "Utilisateur non trouvé" };
            return AdminController.reinitMdp(user, req.body.mdp);
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

router.delete("/supprimer/tous", (req, res) => {
    AdminController.supprimerTous()
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
    AdminController.supprimerUn(req.query.utilisateurId)
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

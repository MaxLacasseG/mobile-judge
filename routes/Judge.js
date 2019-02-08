const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const JudgeController = require("../controllers/Judge");
const FinalController = require("../controllers/Final");

//Ajouter les juges non inscrit dans SGI

router.get("/tous", (req, res) => {
	JudgeController.rechercherTous()
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			return res.status(200).json(resultat);
		})
		.catch(err => {
			return res.status(400).json(err);
		});
});

router.get("/finale", (req, res) => {
	JudgeController.rechercher({ finale: req.query.finaleId })
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

	JudgeController.rechercher(filtre)
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/id", (req, res) => {
	JudgeController.rechercherId(req.query.jugeId)
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun juge trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/pwd", (req, res) => {
	JudgeController.Find({ finalId: req.query.finalId })
		.select("+pwd +username")
		.sort({ number: 1 })
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun juge trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.post("/create", (req, res) => {
	JudgeController.Create(req.body)
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			return res.status(400).json(err);
		});
});

router.post("/login", (req, res) => {
	const { username, pwd, finalId } = req.body;

	JudgeController.Find({ username, pwd, finalId })
		.then(result => {
			if (isEmpty(result)) throw { success: false, msg: "Courriel ou mot de passe inconnu" };
			//res.status(200).json(resultat);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put("/modifier", (req, res) => {
	JudgeController.modifier(req.body)
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.delete("/supprimer/tous", (req, res) => {
	JudgeController.supprimerTous()
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
	JudgeController.supprimerProjetsFinale(req.query.finaleId)
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
	JudgeController.supprimerUn(req.query.jugeId)
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

router.delete("/delete-final-all", (req, res) => {
	FinalController.FindById(req.query.finalId)
		.then(final => {
			if (isEmpty(final)) {
				throw {
					success: false,
					msg: "Juge non trouvé"
				};
			}

			if (isEmpty(final.judges)) {
				return res.status(404).json({
					success: false,
					msg: "Aucun juge à supprimer"
				});
			}

			return JudgeController.DeleteMany(final.judges);
		})
		.then(resultat => {
			if (isEmpty(resultat) || resultat.n === 0) {
				throw {
					success: false,
					msg: "Impossible de supprimer les éléments demandés."
				};
			}

			return res.status(200).json(resultat);
		})
		.catch(err => {
			console.log(err);
			return res.status(400).json(err);
		});
});

module.exports = router;

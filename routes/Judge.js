const express = require("express");
const fs = require("fs");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const judgeConnectionValidator = require("../validators/JudgeConnection");
const newJudgeValidator = require("../validators/NewJudge");

const JudgeController = require("../controllers/Judge");
const FinalController = require("../controllers/Final");
const ProjectController = require("../controllers/Project");

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

router.get("/final-id", (req, res) => {
	JudgeController.Find({ finalId: req.query.finalId })
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

router.get("/projects", (req, res) => {
	logger.log(req.query);
	FinalController.Find({ _id: req.query.finalId })
		.select("-judges -adminId")
		.then(final => {
			if (isEmpty(final[0])) throw { success: false, msg: "Aucune finale trouvée" };
			//Return pairing list by judge
			const projectList = final[0].pairing.pairingByJudges[req.query.judgeNumber];

			return projectList;
		})
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			logger.warn(err);
			res.status(400).json(err);
		});
});

router.post("/create", (req, res) => {
	JudgeController.Create(req.body)
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.post("/add-new", (req, res) => {
	console.trace("newJudge", req.body);
	const { errors, isValid, sanitizedData } = newJudgeValidator(req.body);
	if (!isValid) return res.status(400).json(errors);

	JudgeController.AddNew(req.body)
		.then(result => {
			return FinalController.AddNewJudge(result);
		})
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.post("/login", (req, res) => {
	const { errors, isValid, sanitizedData } = judgeConnectionValidator(req.body);
	if (!isValid) return res.status(400).json(errors);

	JudgeController.Login(sanitizedData)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			logger.log(err);
			res.status(400).json(err);
		});
});

router.put("/set-number", (req, res) => {
	//Validation
	if (isNaN(req.body.judgeNumber)) {
		req.body.judgeNumber = null;
	}

	JudgeController.Find({ judgeId: req.body.judgeId, finalId: req.body.finalId })
		.then(judge => {
			if (isEmpty(judge[0])) {
				throw {
					success: false,
					msg: "Impossible de modifier l'élément demandé."
				};
			}
			judge[0].number = req.body.judgeNumber;
			return judge[0].save();
		})
		.then(savedJudge => {
			//console.log(savedJudge);
			res.status(200).json(savedJudge);
		})
		.catch(err => {
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

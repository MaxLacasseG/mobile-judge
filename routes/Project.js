const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const ProjectController = require("../controllers/Project");
const FinalController = require("../controllers/Final");

router.get("/tous", (req, res) => {
	ProjectController.rechercherTous()
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/finale", (req, res) => {
	ProjectController.rechercher({ finale: req.query.finaleId })
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
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
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/id", (req, res) => {
	ProjectController.FindById(req.query.projetId)
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/final-id", (req, res) => {
	ProjectController.Find({ finalId: req.query.finalId })
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/number", (req, res) => {
	console.log(req.query);
	ProjectController.Find({ finalId: req.query.finalId, number: req.query.projectNumber })
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucun projet trouvé" };
			res.status(200).json(resultat[0]);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.post("/create", (req, res) => {
	ProjectController.Create(req.body)
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.put("/modifier", (req, res) => {
	ProjectController.modifier(req.body)
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.put("/switch-type", (req, res) => {
	ProjectController.Find({ _id: req.body.projectId })
		.then(foundProject => {
			if (isEmpty(foundProject)) throw { success: false, msg: "Aucun projet trouvé" };

			foundProject = foundProject[0];
			foundProject.information.projectInformation.type = req.body.newType;

			return ProjectController.Update(foundProject);
		})
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			logger.log(err);
			res.status(400).json(err);
		});
});

router.delete("/supprimer/tous", (req, res) => {
	ProjectController.supprimerTous()
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
	ProjectController.supprimerProjetsFinale(req.query.finaleId)
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
	ProjectController.supprimerUn(req.query.projetId)
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
					msg: "Finale non trouvée"
				};
			}

			if (isEmpty(final.projects)) {
				return res.status(404).json({
					success: false,
					msg: "Aucun projet à supprimer"
				});
			}

			return ProjectController.DeleteMany(final.projects);
		})
		.then(resultat => {
			if (isEmpty(resultat) || resultat.n === 0) {
				throw {
					success: false,
					msg: "Aucun projet supprimé"
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

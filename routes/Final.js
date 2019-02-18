const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("tracer").colorConsole();
const isEmpty = require("../utils/isEmpty");

const FinalController = require("../controllers/Final");
const finalCreationValidator = require("../validators/FinalCreation");

router.get("/all", (req, res) => {
	FinalController.FindAll()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			logger.log(err);
			res.status(400).json(err);
		});
});

router.get("/all-active-ids", (req, res) => {
	FinalController.FindAllActiveIds()
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.get("/id", (req, res) => {
	FinalController.FindById(req.query.finalId)
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucune finale trouvée" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/active", (req, res) => {
	FinalController.rechercher({ isActive: true })
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucune finale trouvée" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.get("/archived", (req, res) => {
	FinalController.rechercher({ isActive: false })
		.then(resultat => {
			if (isEmpty(resultat)) throw { success: false, msg: "Aucune finale trouvée" };
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.post("/create", (req, res) => {
	const { errors, isValid, sanitizedData } = finalCreationValidator(req.body);
	if (!isValid) return res.status(400).json(errors);

	FinalController.Create(sanitizedData)
		.then(resultat => {
			return res.status(200).json(resultat);
		})
		.catch(err => {
			//Checks if final already exists
			if (err.code === 11000 && err.name === "MongoError") {
				return res.status(400).json({
					success: false,
					msg: "Impossible d'importer la finale. Finale déjà existante"
				});
			}
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.post("/pairing", (req, res) => {
	FinalController.Update(req.body)
		.then(resultat => {
			return res.status(200).json(resultat);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.post("/save-result", (req, res) => {
	console.log(req.body);

	return res.status(200).json(true);
	FinalController.Update(req.body)
		.then(resultat => {
			return res.status(200).json(resultat);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.post("/import-participants/:finaleId", (req, res) => {});

router.put("/update", (req, res) => {
	FinalController.modifier(req.body)
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.put("/activate-final", (req, res) => {
	FinalController.FindById(req.body.finalId)
		.then(final => {
			final.isActive = !final.isActive;
			return FinalController.Update(final);
		})
		.then(result => {
			return res.status(200).json(result);
		})

		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.put("/unarchive", (req, res) => {
	FinalController.reactiver(req.query.finaleId)
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

//TODO:
router.put("/assign-participants", (req, res) => {
	res.status(400).json("TODO");
});

router.put("/archive", (req, res) => {
	FinalController.archiver(req.query.finaleId)
		.then(resultat => {
			res.status(200).json(resultat);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

router.delete("/", (req, res) => {
	FinalController.DeleteOne(req.query.finalId)
		.then(resultat => {
			if (isEmpty(resultat) || resultat.n === 0) {
				throw {
					success: false,
					msg: "Impossible de supprimer l'élément demandé."
				};
			}
			return res.status(200).json(resultat);
		})
		.catch(err => {
			logger.log(err);
			return res.status(400).json(err);
		});
});

router.delete("/delete/all", (req, res) => {
	FinalController.supprimerTous()
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

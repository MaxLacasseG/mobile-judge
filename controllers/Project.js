const logger = require("tracer").colorConsole();
const Projet = require("../models/Project");
const controller = {};

controller.rechercher = filtre => {
	return Projet.find(filtre);
};

controller.rechercherId = projetId => {
	return Projet.findById(projetId);
};

controller.rechercherFinale = finaleId => {
	return Projet.find({ finale: finaleId });
};

controller.rechercherTous = () => {
	return Projet.find({});
};

controller.Create = projectInfos => {
	const newProject = new Projet(projectInfos);
	return newProject.save();
};

controller.modifier = projetId => {
	//TODO: Validation
	return Projet.findByIdAndUpdate(projetId._id, projetId, { new: true });
};

controller.supprimerUn = projetId => {
	return Projet.findByIdAndDelete(projetId);
};

controller.supprimerProjetsFinale = finaleId => {
	return Projet.deleteMany({ finale: finaleId })
		.then(resultats => {
			return resultats;
		})
		.catch(err => {
			throw err;
		});
};

controller.supprimerTous = () => {
	return Projet.deleteMany({})
		.then(resultats => {
			return resultats;
		})
		.catch(err => {
			throw err;
		});
};

module.exports = controller;

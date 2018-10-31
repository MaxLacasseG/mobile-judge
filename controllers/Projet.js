const logger = require("tracer").colorConsole();
const Projet = require("../models/Projet");
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

controller.creer = projetInfos => {
    //TODO: Validation
    const newProjet = new Projet(projetInfos);
    newProjet.jugement = [];
    return newProjet.save();
};

controller.modifier = projetId => {
    //TODO: Validation
    return Projet.findByIdAndUpdate(projetId._id, projetId);
};

controller.supprimerUn = projetId => {
    return Projet.findByIdAndDelete(projetId);
};

controller.supprimerProjetsFinale = finaleId => {
    return Projet.find({ finale: finaleId })
        .then(resultat => {
            return Projet.deleteMany(resultat);
        })
        .catch(err => {
            throw err;
        });
};

module.exports = controller;

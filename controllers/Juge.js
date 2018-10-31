const logger = require("tracer").colorConsole();
const Juge = require("../models/Juge");
const controller = {};

controller.rechercher = filtre => {
    return Juge.find(filtre);
};

controller.rechercherId = jugeId => {
    return Projet.findById(jugeId);
};

controller.rechercherFinale = finaleId => {
    return Juge.find({ finale: finaleId });
};

controller.rechercherTous = () => {
    return Juge.find({});
};

controller.creer = jugeInfos => {
    //TODO: Validation
    const newJuge = new Juge(jugeInfos);
    newJuge.projets = [];
    return newJuge.save();
};

controller.modifier = jugeId => {
    //TODO: Validation
    return Juge.findByIdAndUpdate(jugeId._id, jugeId);
};

controller.supprimerUn = jugeId => {
    return Juge.findByIdAndDelete(jugeId);
};

controller.supprimerJugesFinale = finaleId => {
    return Juge.find({ finale: finaleId })
        .then(resultat => {
            return Juge.deleteMany(resultat);
        })
        .catch(err => {
            throw err;
        });
};

module.exports = controller;

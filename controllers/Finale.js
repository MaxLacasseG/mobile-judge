const logger = require("tracer").colorConsole();
const Finale = require("../models/Finale");
const isEmpty = require("../utils/isEmpty");

const ProjetController = require("./Projet");
const JugeController = require("./Juge");
const RegionController = require("./Region");

const controller = {};

controller.rechercher = filtre => {
    return Finale.find(filtre);
};

controller.rechercherId = finaleId => {
    return Finale.findById(finaleId);
};

controller.rechercherTous = () => {
    return Finale.find({});
};

controller.creer = finaleInfos => {
    //TODO: Validation
    const newFinale = new Finale(finaleInfos);

    return newFinale.save();
};

controller.modifier = finaleInfos => {
    //TODO: Validation
    return Finale.findByIdAndUpdate(finaleInfos._id, finaleInfos);
};

controller.supprimerUn = finaleId => {
    return Finale.findByIdAndDelete(finaleId);
};

controller.archiver = async finaleId => {
    return controller
        .rechercherId(finaleId)
        .then(finaleArchive => {
            if (finaleArchive === null || finaleArchive === undefined) {
                throw { success: false, msg: "Finale non trouvée" };
            }

            finaleArchive.isActive = false;
            return finaleArchive.save();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

controller.reactiver = async finaleId => {
    return controller
        .rechercherId(finaleId)
        .then(finaleArchive => {
            if (finaleArchive === null || finaleArchive === undefined) {
                throw { success: false, msg: "Finale non trouvée" };
            }

            finaleArchive.isActive = true;
            return finaleArchive.save();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

controller.exporterResultatsFinale = finaleId => {
    return true;
};

controller.exporterResultatsActif = () => {
    return true;
};

controller.exporterResultatsTout = () => {
    return true;
};

module.exports = controller;

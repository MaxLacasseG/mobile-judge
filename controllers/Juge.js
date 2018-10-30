const logger = require("tracer").colorConsole();
const Juge = require("../models/Juge");
const controller = {};

controller.rechercher = filtre => {
    return false;
};

controller.rechercherId = finaleId => {
    return false;
};

controller.rechercherTousFinale = finaleId => {
    return false;
};

controller.creer = projetInfos => {
    return true;
};

controller.modifier = projetId => {
    return true;
};

controller.supprimerUn = projetId => {
    return true;
};

controller.supprimerProjetsFinale = finaleId => {
    return true;
};

module.exports = controller;

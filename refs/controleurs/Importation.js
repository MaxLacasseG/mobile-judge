const logger = require("tracer").colorConsole();
const fs = require("fs");
const path = require("path");

const ActiviteController = require("./Activite");
const EtablissementController = require("./Etablissement");
const NiveauScolaireController = require("./NiveauScolaire");
const ProgrammeController = require("./Programme");
const RegionController = require("./Region");
const ResponsableController = require("./Responsable");
const UtilisateurController = require("./Utilisateur");
const RegroupementController = require("./Regroupement");

const controller = {};

controller.importerRegion = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("./utils/json/region.json"), (err, data) => {
            data = JSON.parse(data);
            if (err) logger.log(err);
            for (var region of data) {
                logger.trace(region);
                RegionController.creer(region);
            }
            resolve(data);
        });
    });
};

controller.importerNiveauScolaire = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("./utils/json/niveau.json"), (err, data) => {
            data = JSON.parse(data);
            if (err) logger.log(err);
            for (let niveau of data) {
                logger.trace(niveau);
                NiveauScolaireController.creer(niveau).catch(err => {
                    reject(err);
                });
            }
            resolve(data);
        });
    });
};

controller.importerProgramme = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve("./utils/json/programme.json"),
            (err, data) => {
                data = JSON.parse(data);
                if (err) logger.log(err);
                for (let programme of data) {
                    logger.trace(programme);
                    ProgrammeController.creer(programme).catch(err => {
                        reject(err);
                    });
                }
                resolve(data);
            }
        );
    });
};
//TODO:Modifier
controller.importerCommissionScolaire = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve("./utils/json/commission.json"),
            (err, data) => {
                data = JSON.parse(data);
                if (err) logger.log(err);
                for (let commission of data) {
                    if (commission.code == 999999) {
                        commission.type = "Regroupement des écoles privées";
                    } else if (commission.code == 999998) {
                        commission.type = "Fédération des Cégeps";
                    } else {
                        commission.type = "Commission scolaire";
                    }

                    logger.trace(commission);
                    RegroupementController.creer(commission).catch(err => {
                        reject(err);
                    });
                }
                resolve(data);
            }
        );
    });
};

controller.importerEcole = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve("./utils/json/ecoles_quebec.json"),
            (err, data) => {
                data = JSON.parse(data);
                if (err) logger.log(err);
                for (let ecole of data) {
                    ecole.contact = {};
                    ecole.caracteristiques = {};
                    ecole.caracteristiques.niveaux = {};
                    ecole.caracteristiques.langue = {};

                    ecole.contact.adresse = ecole.adresse;
                    ecole.contact.ville = ecole.ville;
                    ecole.contact.province = ecole.province;
                    ecole.contact.tel = ecole.tel;

                    ecole.caracteristiques.niveaux.prescolaire =
                        ecole.niv_prescolaire;
                    ecole.caracteristiques.niveaux.primaire =
                        ecole.niv_primaire;
                    ecole.caracteristiques.niveaux.secondaire =
                        ecole.niv_secondaire;
                    ecole.caracteristiques.niveaux.adulte = ecole.niv_adulte;
                    ecole.caracteristiques.niveaux.profesionnel =
                        ecole.niv_profesionnel;
                    ecole.caracteristiques.niveaux.collegial =
                        ecole.niv_collegial;
                    ecole.caracteristiques.niveaux.universitaire =
                        ecole.niv_universitaire;

                    ecole.caracteristiques.langue.francais =
                        ecole.caracteristiques.langue_fr;
                    ecole.caracteristiques.langue.anglais = ecole.langue_en;
                    ecole.caracteristiques.langue.autre = ecole.langue_autre;

                    if (
                        (ecole.code_organisme.charAt(0) == 7 ||
                            ecole.code_organisme.charAt(0) == 8) &&
                        ecole.code_organisme.toString().length == 6
                    ) {
                        _codeRegroupement =
                            ecole.code_organisme.toString().substr(0, 3) +
                            "000";
                        logger.log(_codeRegroupement);

                        const id = new Promise((resolve, reject) => {
                            RegroupementController.rechercher({
                                code_regroupement: _codeRegroupement
                            })
                                .then(result => {
                                    if (result[0] == undefined) reject(false);
                                    ecole.regroupement = result[0]._id;
                                    EtablissementController.creer(ecole).then(
                                        result => {
                                            resolve(true);
                                        }
                                    );
                                })
                                .catch(err => {
                                    //TODO:
                                    return err;
                                });
                        });
                    } else {
                        EtablissementController.creer(ecole).catch(err => {
                            reject(err);
                        });
                    }
                } //END FOR LOOP
                resolve("ok");
            }
        );
    });
};

module.exports = controller;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EtablissementSchema = new Schema({
    nom: { type: String, select: true, required: true, unique: true },
    type_etablissement: { type: String, select: true },
    code_organisme: { type: Number, select: true },
    reseau_ens: {
        type: String,
        enum: ["Public", "Privé", "Gouvernemental", "Autre"]
    },
    regroupement: { type: Schema.Types.ObjectId, ref: "Regroupement" },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    contact: {
        adresse: { type: String, select: true },
        ville: { type: String, select: true },
        code_postal: { type: String, select: true, max: 10 },
        province: { type: String, select: true },
        tel: { type: String, select: true },
        courriel: { type: String, select: true }
    },
    indices_defavorisation: {
        indice_seuil_faible_revenu: { type: Number },
        rang_decile_sfr: { type: Number },
        indice_milieu_socio_economique: { type: Number },
        rang_decile_imse: { type: Number }
    },
    caracteristiques: {
        nb_eleves_total: { type: Number },
        niveaux: {
            prescolaire: { type: Boolean, select: true },
            primaire: { type: Boolean, select: true },
            secondaire: { type: Boolean, select: true },
            professionnel: { type: Boolean, select: true },
            adulte: { type: Boolean, select: true },
            collegial: { type: Boolean, select: true },
            universitaire: { type: Boolean, select: true }
        },
        langue: {
            francais: { type: Boolean, select: true },
            anglais: { type: Boolean, select: true },
            autre: { type: Boolean, select: true }
        }
    }
});

module.exports = mongoose.model("Etablissement", EtablissementSchema);

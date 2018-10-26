const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const logger = require("tracer").colorConsole();

const UtilisateurSchema = new Schema({
    courriel: {
        type: String,
        required: true,
        select: true
    },
    estConfirme: { type: Boolean, select: true, default: false },
    confirmationCode: { type: String },
    mdp: { type: String },
    prenom: { type: String, select: true },
    nom: { type: String, select: true },
    resetCode: { type: String, select: false },
    admin: { type: Boolean, default: false }
});

UtilisateurSchema.path("courriel").index({ unique: true });

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);

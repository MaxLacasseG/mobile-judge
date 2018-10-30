const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
    courriel: {
        type: String,
        required: true,
        select: true
    },
    mdp: { type: String },
    prenom: { type: String, select: true },
    nom: { type: String, select: true },
    telephone: { type: String, select: true },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    isAdmin: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetTokenExpired: { type: Number, default: null }
});

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);

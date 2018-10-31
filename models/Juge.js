const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JugeSchema = new Schema({
    numero: { type: Number },
    finale: { type: Schema.Types.ObjectId, ref: "Finale" },
    prenom: { type: String },
    nom: { type: String },
    telephone: { type: String },
    courriel: { type: String },
    employeur: { type: String },
    titre: { type: String },
    prefPremierChoix: { type: String },
    prefDeuxiemeChoix: { type: String },
    prefTroisiemeChoix: { type: String },
    langue: { type: String },
    projets: [
        {
            periode: { type: Number },
            projets: { type: Schema.Types.ObjectId, ref: "Projet" },
            resultat: { type: Schema.Types.Mixed }
        }
    ]
});

module.exports = mongoose.model("Juge", JugeSchema);

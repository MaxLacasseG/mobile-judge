const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjetSchema = new Schema({
    numero: { type: Number },
    finale: { type: Schema.Types.ObjectId, ref: "Finale" },
    titre: { type: String },
    langue: { type: String },
    participant1_prenom: { type: String },
    participant1_nom: { type: String },
    participant2_prenom: { type: String },
    participant2_nom: { type: String },
    type: { type: String },
    categorie: { type: String },
    classe: { type: String },
    jugement: [
        {
            periode: { type: Number },
            juge: { type: Schema.Types.ObjectId, ref: "Juge" },
            resultat: { type: Schema.Types.Mixed }
        }
    ]
});
module.exports = mongoose.model("Projet", ProjetSchema);

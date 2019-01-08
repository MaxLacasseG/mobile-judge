const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinaleSchema = new Schema({
    isActive: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    date: { type: Date },
    nom: { type: String },
    lieu: { type: String },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    juges: [{ type: Schema.Types.ObjectId, ref: "Juge" }],
    projets: [{ type: Schema.Types.ObjectId, ref: "Projet" }]
});

module.exports = mongoose.model("Finale", FinaleSchema);

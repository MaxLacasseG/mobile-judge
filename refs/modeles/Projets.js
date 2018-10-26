const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjetSchema = new Schema({
    titre: { type: String },
    categorie: { type: String },
    description: { type: String },
    images: [{ type: Object }],
    likes: { type: Number },
    tags: [{ type: String }]
});

module.exports = mongoose.model("Projet", ProjetSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjetSchema = new Schema({
	numero: { type: Number },
	finale: { type: Schema.Types.ObjectId, ref: "Finale" },
	titre: { type: String },
	participant1: {
		prenom: { type: String },
		nom: { type: String }
	},
	participant2: {
		prenom: { type: String },
		nom: { type: String }
	},
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

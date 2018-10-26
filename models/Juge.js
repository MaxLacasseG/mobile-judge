const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JugeSchema = new Schema({
	numero: { type: Number },
	finale: { type: Schema.Types.ObjectId, ref: "Finale" },
	prenom: { type: String },
	nom: { type: String },
	telephone: { type: String },
	courriel: { type: String },
	projets: [
		{
			type: Schema.Types.ObjectId,
			ref: "Projet"
		}
	]
});

module.exports = mongoose.model("Juge", JugeSchema);

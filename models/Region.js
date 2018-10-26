const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
	nom: { type: String },
	organismeRegional: { type: String }
});

module.exports = mongoose.model("Region", RegionSchema);

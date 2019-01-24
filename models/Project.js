const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	projectId: { type: Schema.Types.ObjectId },
	classification: { type: String },
	participants: [{ type: Object }],
	information: { type: Object },
	number: { type: Number },
	finalId: { type: Schema.Types.ObjectId }
});
module.exports = mongoose.model("Project", ProjectSchema);

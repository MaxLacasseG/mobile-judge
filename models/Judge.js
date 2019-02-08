const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JudgeSchema = new Schema({
	username: { type: String, select: false },
	pwd: { type: String, select: false },
	judgeId: { type: Schema.Types.ObjectId },
	finalId: { type: Schema.Types.ObjectId },
	number: { type: Number },
	information: { type: Object }
});

module.exports = mongoose.model("Judge", JudgeSchema);

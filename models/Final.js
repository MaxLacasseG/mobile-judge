const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinalSchema = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		isArchived: { type: Boolean, default: false },
		isActive: { type: Boolean, default: false },
		isSuperExpo: { type: Boolean, default: false },
		eventDate: { type: Date },
		shortName: { type: String },
		longName: { type: String },
		program: { type: Number },
		location: { type: String },
		region: { type: Number },
		level: { type: String },
		judges: [{ type: Schema.Types.ObjectId, ref: "Judge" }],
		projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
		adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
		pairing: { type: Object },
		results: { type: Object, default: {} },
		reportsResults: { type: Object, default: {} },
		specialCharacter: { type: String }
	},
	{ minimize: false }
);

module.exports = mongoose.model("Final", FinalSchema);

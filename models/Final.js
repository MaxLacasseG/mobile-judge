const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinaleSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    isArchived: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    eventDate: { type: Date },
    longName: { type: String },
    program: { type: Number },
    location: { type: String },
    region: { type: Number },
    level: { type: String },
    judges: [{ type: Schema.Types.ObjectId, ref: "Judge" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    adminId: { type: Schema.Types.ObjectId, ref: "Admin" }
});

module.exports = mongoose.model("Finale", FinaleSchema);

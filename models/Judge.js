const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JudgeSchema = new Schema({
	judgeId: { type: Schema.Types.ObjectId },
	finalId: { type: Schema.Types.ObjectId },
	number: { type: Number },
	pwd: { type: String },
	information: { type: Object }
});

JudgeSchema.pre("save", function(next) {
	var judge = this;
	// only hash the password if it has been modified (or is new)
	if (!judge.isModified("pwd")) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(judge.mdp, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			judge.mdp = hash;
			next();
		});
	});
});

JudgeSchema.methods.comparePassword = (candidatePassword, cb) => {
	bcrypt.compare(candidatePassword, this.pwd, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model("Judge", JudgeSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UtilisateurSchema = new Schema({
    courriel: {
        type: String,
        required: true,
        select: true
    },
    mdp: { type: String },
    prenom: { type: String, select: true },
    nom: { type: String, select: true },
    telephone: { type: String, select: true },
    region: { type: Schema.Types.ObjectId, ref: "Region" },
    isAdmin: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetTokenExpired: { type: Number, default: null }
});

UtilisateurSchema.pre("save", function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("mdp")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.mdp, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.mdp = hash;
            next();
        });
    });
});

UtilisateurSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.mdp, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);

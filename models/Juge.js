const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JugeSchema = new Schema({
    numero: { type: Number },
    mdp: { type: String },
    finale: { type: Schema.Types.ObjectId, ref: "Finale" },
    prenom: { type: String },
    nom: { type: String },
    telephone: { type: String },
    courriel: { type: String },
    employeur: { type: String },
    titre: { type: String },
    prefPremierChoix: { type: String },
    prefDeuxiemeChoix: { type: String },
    prefTroisiemeChoix: { type: String },
    langue: { type: String },
    projets: [
        {
            periode: { type: Number },
            projets: { type: Schema.Types.ObjectId, ref: "Projet" },
            resultat: { type: Schema.Types.Mixed }
        }
    ]
});

JugeSchema.pre("save", function(next) {
    var judge = this;
    // only hash the password if it has been modified (or is new)
    if (!judge.isModified("mdp")) return next();

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

JugeSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.mdp, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Juge", JugeSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const logger = require("tracer").colorConsole();

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        select: true
    },
    pwd: { type: String },
    firstName: { type: String, select: true },
    lastName: { type: String, select: true },
    phone: { type: String, select: true },
    isAdmin: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetTokenExpired: { type: Number, default: null }
});

UserSchema.pre("save", function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("pwd")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.pwd, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.pwd = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.pwd, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", UserSchema);

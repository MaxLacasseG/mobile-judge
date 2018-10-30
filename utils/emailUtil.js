const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const emailUtil = {};

emailUtil.send = mailOptions => {
    const transporter = nodemailer.createTransport(keys.nodeMailerConfig);

    return transporter.sendMail(mailOptions, function(err, info) {
        if (err) throw err;
        else return info;
    });
};

module.exports = emailUtil;

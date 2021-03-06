const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const emailUtil = {};

emailUtil.send = mailOptions => {
    const transporter = nodemailer.createTransport(keys.nodeMailerConfig);

    return transporter.sendMail(mailOptions, (err, info) => {
        console.log(info);
        if (err) console.log(err);
        else return info;
    });
};

module.exports = emailUtil;

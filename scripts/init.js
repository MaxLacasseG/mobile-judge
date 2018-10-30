const logger = require("tracer").colorConsole();
const mongoose = require("mongoose");
const prompt = require("prompt");
const utilcontroller = require("../controllers/Utilisateur");

var dbpath = process.env.DBPATH || "localhost";
mongoose.connect(
    "mongodb://" + dbpath + "/jugement",
    { useNewUrlParser: true }
);

prompt.start();

var schema = {
    properties: {
        courriel: {
            required: true
        },
        prenom: {
            pattern: /^[a-zA-Z]+$/,
            required: true
        },
        nom: {
            pattern: /^[a-zA-Z]+$/,
            required: true
        },
        telephone: {
            required: true
        },
        mdp: {
            hidden: true,
            replace: "*",
            required: true
        },
        isAdmin: {
            description: "Est administrateur? vrai | faux",
            pattern: /^(vrai|faux)$/,
            message: "Répondre par vrai ou faux",
            required: true
        }
    }
};

prompt.get(schema, (err, promptResult) => {
    if (err) {
        console.log(err.stack ? err.stack : err);
        process.exit();
    }
    promptResult.isAdmin = promptResult.isAdmin === "vrai" ? true : false;

    utilcontroller
        .creer(promptResult)
        .then(success => {
            logger.trace(success);
            process.exit();
        })
        .catch(err => {
            logger.warn(err);
            process.exit();
        });
});

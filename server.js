const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const passport = require("passport");
const logger = require("tracer").colorConsole();
const mongoose = require("mongoose");
const morgan = require("morgan");
const db = require("./config/keys").mongoURI;

//REQUIRE ROUTES
const adminRoutes = require("./routes/Admin");
const judgeRoutes = require("./routes/Judge");
const projectRoutes = require("./routes/Project");
const finalRoutes = require("./routes/Final");

mongoose.connect(
    db,
    { useNewUrlParser: true },
    err => {
        if (err) logger.log(err);
        logger.trace("Connecté à la base de donnée");
    }
);

//PASSPORT INIT, ADDS TO REQUESTS
passport.initialize();
require("./config/passport")(passport);

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/judge", judgeRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/final", finalRoutes);

app.listen(port, err => {
    if (err) logger.log(err);
    logger.trace(`listening on ${port}`);
});

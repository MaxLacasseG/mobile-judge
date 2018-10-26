const isAdmin = (req, res, next) => {
    if (req.user === undefined || !req.user.admin) {
        res.status(401).json({ success: false, msg: "Accès non autorisé" });
    } else {
        next();
    }
};

module.exports = isAdmin;

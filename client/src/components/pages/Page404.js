import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <div>
            <h1 className="display-4">404 Page introuvable</h1>
            <p className="text lead">Désolé la page demandée n'existe pas</p>
            <Link to="/">Retour à la page d'accueil</Link>
        </div>
    );
};

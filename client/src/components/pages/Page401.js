import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <div>
            <h1 className="display-4">401 Accès interdit</h1>
            <p className="text lead">
                Désolé la page demandée n'est pas accessible
            </p>
            <Link to="/accueil">Retour à la page d'accueil</Link>
        </div>
    );
};

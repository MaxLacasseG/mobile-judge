import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/authActions";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logoutUser();
    }
    render() {
        const isAuthenticated = this.props.auth.isAuthenticated;
        const isAdmin = this.props.auth.utilisateur.admin;
        return (
            <nav class="navbar navbar-expand-md navbar-dark bg-info">
                <a class="navbar-brand" href="/">
                    LOGO
                </a>

                {/*BOUTON MOBILE*/}
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon" />
                </button>

                {/* MENU PRINCIPAL*/}
                <div class="collapse navbar-collapse" id="menuPrincipal">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/connexion">
                                Accueil
                                <span class="sr-only">(Page courante)</span>
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <ul className="nav navbar-nav">
                                <li class="nav-item dropdown">
                                    <div
                                        class="dropdown-menu"
                                        aria-labelledby="menuSemaines"
                                    >
                                        <Link class="dropdown-item" to="/#">
                                            item
                                        </Link>
                                        <Link class="dropdown-item" to="/#">
                                            item
                                        </Link>{" "}
                                        <Link class="dropdown-item" to="/#">
                                            item
                                        </Link>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link
                                        class="nav-link dropdown-toggle"
                                        to="#"
                                        id="menuProfil"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Item
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </ul>
                    <div class="pull-right">
                        <ul class="nav navbar-nav">
                            {isAuthenticated ? (
                                <li class="nav-item">
                                    <Link
                                        class="nav-link"
                                        to="#"
                                        onClick={this.onLogout}
                                    >
                                        Déconnexion
                                    </Link>
                                </li>
                            ) : (
                                <li class="nav-item">
                                    <Link class="nav-link" to="/connexion">
                                        Connexion
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Nav);

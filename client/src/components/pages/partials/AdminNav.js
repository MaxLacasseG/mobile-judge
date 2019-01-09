import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/authActions";

class AdminNav extends Component {
    onLogout = () => {
        this.props.logoutUser(this.props.history);
    };
    render() {
        const { isAuthenticated } = this.props.auth;
        const { isAdmin } = this.props.auth.user;

        const superAdminMenu = (
            <ul className="nav nav-bar justify-content-around align-items-center px-5 py-3">
                <Link to="/admin/panneau-controle" className="px-3">
                    Liste des finales
                </Link>
                <Link to="/admin/liste-admin" className="px-3">
                    Ajouter un administrateur
                </Link>
            </ul>
        );
        return (
            <Fragment>
                <ul className="nav nav-bar justify-content-around align-items-center p-3">
                    <li>
                        <img className="logo" src="/img/logo.png" alt="" />
                    </li>
                    <li className="text-center">
                        <h1>Portail gestionnaire</h1>
                        <h3>{this.props.pageTitle}</h3>
                    </li>
                    {isAuthenticated ? (
                        <li className="nav-item text-right ">
                            <Link className="nav-link" to="#" onClick={this.onLogout}>
                                Déconnexion
                            </Link>
                            <small>Connecté en tant que {this.props.auth.user.firstName + " " + this.props.auth.user.lastName}</small>
                            <br />
                            <small>{this.props.auth.user.isAdmin ? "Super administrateur" : "Administrateur"}</small>
                        </li>
                    ) : null}
                </ul>
                {isAdmin ? superAdminMenu : null}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(AdminNav));

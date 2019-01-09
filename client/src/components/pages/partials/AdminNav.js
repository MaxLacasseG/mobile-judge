import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/authActions";

class AdminNav extends Component {
    onLogout = () => {
        this.props.logoutUser(this.props.history);
    };
    render() {
        const isAuthenticated = this.props.auth.isAuthenticated;

        return (
            <ul className="nav nav-bar justify-content-around align-items-center p-3">
                <li>
                    <img className="logo" src="/img/logo.png" alt="" />
                </li>
                <li className="text-center">
                    <h1>Portail gestionnaire</h1>
                    <h3>Vue d'ensemble des finales</h3>
                </li>
                {isAuthenticated ? (
                    <li className="nav-item text-right ">
                        <Link className="nav-link" to="#" onClick={this.onLogout}>
                            Déconnexion
                        </Link>
                    </li>
                ) : null}
            </ul>
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

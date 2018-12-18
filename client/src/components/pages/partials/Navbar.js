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

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-info">
                <a className="navbar-brand" href="/">
                    LOGO
                </a>

                {/* MENU PRINCIPAL*/}
                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <div className="pull-right">
                        <ul className="nav navbar-nav">
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="#" onClick={this.onLogout}>
                                        Déconnexion
                                    </Link>
                                </li>
                            ) : null}
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

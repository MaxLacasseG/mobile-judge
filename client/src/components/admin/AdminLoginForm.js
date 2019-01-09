import React, { Component } from "react";
import { connect } from "react-redux";
import { adminLogin } from "../../store/actions/authActions";
import { withRouter } from "react-router-dom";

class ConnexionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated && this.props.auth.user.isAdmin) {
            this.props.history.push("/admin/panneau-controle");
        }
    };
    onSubmit = e => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            pwd: this.state.password,
            type: "ADMIN"
        };

        this.props.adminLogin(user, this.props.history);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const errors = this.props.errors;
        return (
            <div className="adminLogin p-5">
                <div className="container">
                    <div className="row p-5">
                        <div className="col-8 offset-2 text-center">
                            <img className="logo" src="/img/logo.png" alt="logo" />
                            <br />
                            <h6>
                                L'application du jugement <br /> des Expo-sciences Hydro-Québec
                            </h6>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6 offset-3 text-center">
                            <h1>Connexion</h1>
                            <h3>Portail gestionnaire</h3>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-6 offset-3">
                                {/* USERNAME */}
                                <div className="form-group">
                                    <label htmlFor="emailInput" className="text-left">
                                        Utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        id="emailInput"
                                        aria-describedby="helpId"
                                        placeholder="Courriel"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                {/* PWD */}
                                <div className="form-group">
                                    <label htmlFor="pwdInput">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="pwdInput"
                                        aria-describedby="pwdHelp"
                                        placeholder="Mot de passe"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                {/* SUBMIT BTN */}
                                <div className="form-group mt-5">
                                    <button type="submit" className="btn btn-lg btn-primary btn-block text-capitalize">
                                        Connexion
                                    </button>
                                    {errors.msg && (
                                        <div className="alert alert-info mt-2" role="alert">
                                            {errors.msg}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { adminLogin }
)(withRouter(ConnexionForm));

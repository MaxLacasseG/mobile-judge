import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/actions/authActions";
import { withRouter } from "react-router-dom";

class JudgeLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            courriel: this.state.email,
            mdp: this.state.password
        };

        this.props.login(user, this.props.history);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/selection-finale");
        }
    }
    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Connexion</h1>
                            <p className="lead text-center">Juges</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <select name="" id="">
                                        <option value="">Sélectionner une finale régionale</option>
                                        <option value="asdfadsf">Finale régionale de Montréal - Volet primaire</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
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
    { login }
)(withRouter(JudgeLogin));

import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "react-router-dom";
import { changementMdp } from "../../store/actions/authActions";
class MdpChangement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mdp: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.changementMdp(this.props.match.params[0], this.state.mdp);
        this.props.history.push("/admin-connexion");
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="mdp-oubli">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Modifier votre mot de passe</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Mot de passe"
                                        name="mdp"
                                        value={this.state.mdp}
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

export default connect(
    null,
    { changementMdp }
)(MdpChangement);

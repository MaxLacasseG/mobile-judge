import React, { Component } from "react";

export default class MdpOubli extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courriel: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {}
    render() {
        return (
            <div className="mdp-oubli">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Récupération du mot de passe</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="courriel"
                                        className="form-control form-control-lg"
                                        placeholder="Courriel"
                                        name="courriel"
                                        value={this.state.courriel}
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

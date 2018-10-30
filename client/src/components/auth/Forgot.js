import React, { Component } from "react";

class Forgot extends Component {
    render() {
        return (
            <div>
                <form action="POST">
                    <legend />
                    <div className="form-group">
                        <label htmlFor="email">Courriel</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            autofocus
                        />
                    </div>
                    <button className="btn-primary btn" type="submit">
                        Réinitialiser le mot de passe
                    </button>
                </form>
            </div>
        );
    }
}

export default Forgot;

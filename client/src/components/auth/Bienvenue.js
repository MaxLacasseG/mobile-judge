import React, { Component } from "react";
import { connect } from "react-redux";

class Bienvenue extends Component {
    render() {
        const isAuthenticated = this.props.auth.isAuthenticated;
        const isAdmin = this.props.auth.utilisateur.admin;

        return (
            <div className="entete">
                {isAuthenticated && (
                    <div class="row bg-secondary mb-4 pt-2 pb-2">
                        <p className="lead m-auto text-white">
                            Bienvenue, {this.props.auth.utilisateur.courriel}
                            {isAdmin && " | Administrateur"}
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    null
)(Bienvenue);

import React, { Component } from "react";
import { connect } from "react-redux";
class Accueil extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;
        return <div>{isAuthenticated ? <h1>Accueil</h1> : <h1>Connectez-vous</h1>}</div>;
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Accueil);

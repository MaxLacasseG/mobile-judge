import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ManagerRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => (auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/admin-connexion" />)} />
);

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(ManagerRoute);

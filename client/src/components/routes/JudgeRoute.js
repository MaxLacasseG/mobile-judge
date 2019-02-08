import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const JudgeRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.isAuthenticated ? (
				auth.user.type === "JUDGE" ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			) : (
				<Redirect to="/" />
			)
		}
	/>
);

const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps)(JudgeRoute);

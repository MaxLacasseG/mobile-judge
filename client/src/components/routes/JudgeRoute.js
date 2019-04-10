import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import FinalEnded from "../judges/FinalEnded";
import { CheckFinalActive } from "../../store/actions/finalActions";

class JudgeRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}
	componentDidMount = () => {
		this.props.CheckFinalActive(this.props.auth.user.finalId);
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.final.isActive !== this.props.final.isActive) {
			this.setState({ isActive: this.props.final.isActive });
		}
	};

	render() {
		const auth = this.props.auth;
		const isActive = this.state.isActive;
		//console.log("isAuthenticated", auth.isAuthenticated);
		return (
			<Fragment>
				{!isActive ? (
					<FinalEnded />
				) : (
					<Route
						{...this.props}
						render={props =>
							auth.isAuthenticated === true && auth.user.type === "JUDGE" ? (
								<Component {...props} />
							) : (
								<Redirect to="/" />
							)
						}
					/>
				)}
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,
	final: state.final
});

export default connect(
	mapStateToProps,
	{ CheckFinalActive }
)(JudgeRoute);

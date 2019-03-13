import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetAllActiveFinalsIds } from "../../store/actions/finalActions";
import { Login } from "../../store/actions/judgeActions";

import classnames from "classnames";

class JudgeLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			finalId: "",
			username: "",
			pwd: ""
		};
	}

	componentDidMount() {
		this.props.GetAllActiveFinalsIds();

		if (this.props.auth.isAuthenticated && this.props.auth.user.type === "JUDGE") {
			this.props.history.push("/mon-jugement");
		}
	}

	OnChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	OnChangeLower = e => {
		this.setState({ [e.target.name]: e.target.value.toLowerCase() });
	};

	OnSelect = e => {
		this.setState({ [e.target.name]: e.target.selectedOptions[0].dataset.id });
	};

	OnSubmit = e => {
		e.preventDefault();

		this.props.Login(this.state, this.props.history);
	};

	render() {
		const errors = this.props.errors;
		const finalList = this.props.final.finalList;
		const activeFinalList = finalList.map(final => {
			return (
				<option
					className="judge-finals-options"
					value={final._id}
					data-id={final._id}
					key={final._id}
				>
					{final.shortName}
				</option>
			);
		});

		return (
			<div className="judge-login">
				<div className="container">
					<div className="row p-4 p-md-5">
						{/** LOGO FOR MOBILE */}
						<div className="col-md-4 text-center offset-md-2 d-none d-md-block">
							<img className="logo" src="/img/logo_exs_mobile.png" alt="logo" />
						</div>
						<div className="col-md-4 text-center d-none d-md-block">
							<img className="logo" src="/img/logo_mobile.png" alt="logo" />
						</div>

						{/** LOGO FOR TABLET & UP */}
						<div className="col-md-4 text-center offset-md-2 d-md-none">
							<img className="logo" src="/img/logo_exs.png" alt="logo" />
						</div>
						<div className="col-md-4 text-center d-md-none">
							<img className="logo" src="/img/logo.png" alt="logo" />
						</div>
					</div>
					<div className="row text-center">
						<div className="col-md-6 mx-auto">
							<h6>
								L'application du jugement <br /> des Expo-sciences Hydro-Québec
							</h6>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Connexion</h1>
							<p className="lead text-center">Juges</p>
							<form onSubmit={this.OnSubmit}>
								{/** PREVENTS FIELD AUTO COMPLETION*/}
								<input type="email" style={{ display: "none" }} />
								<input type="password" style={{ display: "none" }} />

								<div className="form-group">
									<label htmlFor="finalId">
										Finale régionale des Expo-sciences Hydro-Québec
									</label>
									<select
										className={classnames("selectpicker custom-select", {
											"is-invalid": errors.finalId
										})}
										name="finalId"
										id="finalId"
										value={this.state.finalId}
										onChange={this.OnSelect}
									>
										<optgroup className="judge-finals-options">
											<option value="">Sélectionner la finale</option>
											{activeFinalList}
										</optgroup>
									</select>
									{errors.finalId && (
										<div className="invalid-feedback">{errors.finalId}</div>
									)}
								</div>

								<div className="form-group">
									<label htmlFor="username">Courriel</label>
									<input
										type="text"
										className={classnames("form-control", {
											"is-invalid": errors.username
										})}
										name="username"
										id="username"
										placeholder="Courriel"
										value={this.state.username}
										onChange={this.OnChangeLower}
									/>
									{errors.username && (
										<div className="invalid-feedback">{errors.username}</div>
									)}
								</div>

								<div className="form-group">
									<label htmlFor="pwd">Mot de passe</label>
									<input
										type="password"
										className={classnames("form-control", {
											"is-invalid": errors.pwd
										})}
										placeholder="Mot de passe"
										name="pwd"
										id="pwd"
										value={this.state.pwd}
										onChange={this.OnChange}
									/>
									{errors.pwd && (
										<div className="invalid-feedback">{errors.pwd}</div>
									)}
								</div>
								<input
									type="submit"
									className="btn btn-info btn-block my-4"
									value="Se connecter"
								/>
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
	final: state.final,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ Login, GetAllActiveFinalsIds }
)(withRouter(JudgeLogin));

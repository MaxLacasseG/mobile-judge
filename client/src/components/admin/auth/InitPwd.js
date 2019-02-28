import React, { Component } from "react";
import { connect } from "react-redux";
import { InitPwd } from "../../../store/actions/adminActions";

import classnames from "classnames";

class InitPwdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPwd: "",
			pwd: "",
			pwd2: "",
			_id: ""
		};
		this.initialState = this.state;
	}
	componentDidMount = () => {
		this.setState({ _id: this.props.auth.user.id });
	};
	onSubmit = e => {
		e.preventDefault();
		this.props.InitPwd(this.state);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		const errors = this.props.errors;
		return (
			<div className="p-5 admin-login">
				<h1>Bienvenue sur l'application Jugement mobile</h1>
				<p>
					Veuillez modifier votre mot de passe avant de continuer. Ce dernier doit
					comporter au minimum 8 caractères, une majuscule et un chiffre.
				</p>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="pwd">Nouveau mot de passe</label>
						<input
							type="password"
							className={classnames("form-control", { "is-invalid": errors.pwd })}
							name="pwd"
							id="pwd"
							placeholder="Mot de passe"
							onChange={this.onChange}
						/>
						{errors.pwd && <div className="invalid-feedback">{errors.pwd}</div>}
					</div>
					<div className="form-group">
						<label htmlFor="pwd2">Veuillez confirmer votre nouveau mot de passe</label>
						<input
							type="password"
							className={classnames("form-control", { "is-invalid": errors.pwd2 })}
							name="pwd2"
							id="pwd2"
							placeholder="Mot de passe"
							onChange={this.onChange}
						/>
						{errors.pwd2 && <div className="invalid-feedback">{errors.pwd2}</div>}
					</div>
					<input type="submit" value="Soumettre" />
				</form>
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
	{ InitPwd }
)(InitPwdForm);

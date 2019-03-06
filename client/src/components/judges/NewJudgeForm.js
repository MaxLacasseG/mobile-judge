import React, { Component } from "react";
import { connect } from "react-redux";
import { AddNewJudge } from "../../store/actions/judgeActions";
import { ClearResponse } from "../../store/actions/responseActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class NewJudgeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			postalCode: "",
			finalId: this.props.final.selectedFinal._id,
			specialCharacter: this.props.final.selectedFinal.specialCharacter
		};
		this.initialState = this.state;
	}

	componentDidMount = () => {
		this.setState({
			finalId: this.props.final.selectedFinal._id,
			specialCharacter: this.props.final.selectedFinal.specialCharacter
		});
	};

	componentWillUnmount = () => {
		this.props.ClearResponse();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.final !== this.props.final) {
			this.setState({
				finalId: this.props.final.selectedFinal._id,
				specialCharacter: this.props.final.selectedFinal.specialCharacter
			});
		}
		if (
			this.props.action.response !== prevProps.action.response &&
			this.props.action.type === "CREATE_JUDGE" &&
			this.props.action.response === "success"
		) {
			this.ResetForm();
		}
	};

	ResetForm = () => {
		this.setState(this.initialState);
	};

	OnChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	OnChangePostalCode = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	OnCheck = e => {
		this.setState({ [e.target.name]: e.target.checked });
	};

	OnSelect = e => {
		this.setState({ [e.target.name]: e.target.selectedOptions[0].value });
	};

	OnSubmit = e => {
		e.preventDefault();
		//console.log(this.state);
		this.props.AddNewJudge(this.state);
	};

	render() {
		const errors = this.props.errors;
		const action = this.props.action;

		const successMessage = (
			<div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
				Juge ajouté
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
					onClick={this.props.ClearResponse}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);

		return (
			<form onSubmit={this.OnSubmit} className="p-5" autoComplete="nope">
				{/* Hidden email and password inputs to prevent autocomplete behavior  */}
				<input
					id="username"
					style={{ display: "none" }}
					type="text"
					name="fakeusernameremembered"
				/>
				<input
					id="password"
					style={{ display: "none" }}
					type="password"
					name="fakepasswordremembered"
				/>
				{/* BEGINNING OF FORM */}
				<h4 className="section-header">
					<i className="fa fa-plus-circle" />
					{"  "}
					Ajouter un juge manuellement
				</h4>
				<div className="form-group row">
					<div className="col-md-6">
						<label htmlFor="firstName">Prénom</label>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.firstName
							})}
							name="firstName"
							id="firstName"
							placeholder="Prénom"
							onChange={this.OnChange}
							value={this.state.firstName}
						/>
						{errors.firstName && (
							<div className="invalid-feedback">{errors.firstName}</div>
						)}
					</div>
					<div className="col-md-6">
						<label htmlFor="lastName">Nom de famille</label>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.lastName
							})}
							name="lastName"
							id="lastName"
							placeholder="Nom de famille"
							onChange={this.OnChange}
							value={this.state.lastName}
						/>
						{errors.lastName && (
							<div className="invalid-feedback">{errors.lastName}</div>
						)}
					</div>
				</div>
				<div className="form-group row">
					<div className="col-md-6">
						<label htmlFor="email">Courriel</label>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.email
							})}
							name="email"
							id="email"
							placeholder="Courriel"
							onChange={this.OnChange}
							value={this.state.email}
						/>
						{errors.email && <div className="invalid-feedback">{errors.email}</div>}
					</div>
					<div className="col-md-6">
						<label htmlFor="phone">Numéro de téléphone</label>
						<input
							type="tel"
							className={classnames("form-control", {
								"is-invalid": errors.phone
							})}
							id="phone"
							name="phone"
							pattern="[0-9]{3} [0-9]{3}-[0-9]{4}"
							placeholder="222 222-2222"
							onChange={this.OnChange}
							value={this.state.phone}
						/>
						{errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
					</div>
				</div>
				<hr />
				<div className="form-group row">
					<div className="col-md-6">
						<label htmlFor="address">Adresse</label>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.address
							})}
							name="address"
							id="address"
							placeholder="Adresse"
							onChange={this.OnChange}
							value={this.state.address}
						/>
						{errors.address && <div className="invalid-feedback">{errors.address}</div>}
					</div>
					<div className="col-md-4">
						<label htmlFor="city">Ville</label>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.city
							})}
							name="city"
							id="city"
							placeholder="Ville"
							onChange={this.OnChange}
							value={this.state.city}
						/>
						{errors.city && <div className="invalid-feedback">{errors.city}</div>}
					</div>
					<div className="col-md-2">
						<label htmlFor="postalCode">Code postal</label>
						<input
							type="text"
							className={classnames("form-control", {
								"is-invalid": errors.postalCode
							})}
							name="postalCode"
							id="postalCode"
							pattern="([A-Z][0-9][A-Z])\s?([0-9][A-Z][0-9])"
							placeholder="H1V 0B2"
							onChange={this.OnChangePostalCode}
							value={this.state.postalCode}
						/>
						{errors.postalCode && (
							<div className="invalid-feedback">{errors.postalCode}</div>
						)}
					</div>
				</div>
				<button type="submit" className="btn form-control">
					<i className="fa fa-plus-circle fa-lg" /> Créer le juge
				</button>
				{action.type === "CREATE_JUDGE" && action.response === "success"
					? successMessage
					: null}

				<hr />
			</form>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors,
	action: state.action,
	final: state.final
});

NewJudgeForm.propTypes = {
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	action: PropTypes.object.isRequired,
	AddNewJudge: PropTypes.func.isRequired,
	ClearResponse: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ AddNewJudge, ClearResponse }
)(NewJudgeForm);

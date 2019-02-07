import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetAllActiveFinalsIds } from "../../store/actions/finalActions";
import { Login } from "../../store/actions/judgeActions";
class JudgeLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			final: "",
			number: "",
			password: ""
		};
	}

	componentDidMount() {
		this.props.GetAllActiveFinalsIds();

		if (this.props.auth.isAuthenticated && this.props.auth.user.isJudge) {
			this.props.history.push("/juge");
		}
	}

	OnChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	OnSelect = e => {
		this.setState({ [e.target.name]: e.target.selectedOptions[0].dataset.id });
	};

	OnSubmit = e => {
		e.preventDefault();

		const user = {
			final: this.state.final,
			number: this.state.number,
			password: this.state.password
		};

		this.props.Login(user, this.props.history);
	};

	render() {
		const finalList = this.props.final.finalList;
		const activeFinalList = finalList.map(final => {
			return (
				<option data-id={final._id} key={final._id}>
					{final.longName}
				</option>
			);
		});

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Connexion</h1>
							<p className="lead text-center">Juges</p>
							<form onSubmit={this.OnSubmit}>
								{/** PREVENTS FIELD AUTO COMPLETION*/}
								<input type="email" style={{ display: "none" }} />
								<input type="password" style={{ display: "none" }} />

								<div className="form-group">
									<label htmlFor="final">Finale régionale</label>
									<select
										className="custom-select"
										name="final"
										id="final"
										value={this.state.final}
										onChange={this.OnSelect}
									>
										<option value="">Sélectionner une finale régionale</option>
										{activeFinalList}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="number">Numéro du juge</label>
									<input
										type="text"
										className="form-control"
										name="number"
										id="number"
										placeholder="Numéro de juge"
										value={this.state.number}
										onChange={this.OnChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Mot de passe</label>
									<input
										type="password"
										className="form-control"
										placeholder="Mot de passe"
										name="password"
										id="password"
										value={this.state.password}
										onChange={this.OnChange}
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

const mapStateToProps = state => ({
	auth: state.auth,
	final: state.final,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ Login, GetAllActiveFinalsIds }
)(withRouter(JudgeLogin));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetAllActiveFinalsIds } from "../../store/actions/finalActions";
import { Login } from "../../store/actions/judgeActions";
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

	OnSelect = e => {
		this.setState({ [e.target.name]: e.target.selectedOptions[0].dataset.id });
	};

	OnSubmit = e => {
		e.preventDefault();

		this.props.Login(this.state, this.props.history);
	};

	render() {
		const finalList = this.props.final.finalList;
		const activeFinalList = finalList.map(final => {
			return (
				<option value={final._id} data-id={final._id} key={final._id}>
					{final.longName}
				</option>
			);
		});

		return (
			<div className="judge-login">
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
									<label htmlFor="finalId">Finale régionale</label>
									<select
										className="custom-select"
										name="finalId"
										id="finalId"
										value={this.state.finalId}
										onChange={this.OnSelect}
									>
										<option value="">Sélectionner une finale régionale</option>
										{activeFinalList}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="username">Courriel</label>
									<input
										type="text"
										className="form-control"
										name="username"
										id="username"
										placeholder="Courriel"
										value={this.state.username}
										onChange={this.OnChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="pwd">Mot de passe</label>
									<input
										type="password"
										className="form-control"
										placeholder="Mot de passe"
										name="pwd"
										id="pwd"
										value={this.state.pwd}
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

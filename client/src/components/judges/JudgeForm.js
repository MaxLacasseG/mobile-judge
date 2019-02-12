import React, { Component } from "react";
import { Link } from "react-router-dom";
import EvaluationGrid from "./evaluationGrids/EvaluationGrid";
export default class JudgeForm extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 mx-auto my-5">
						<div className="btn btn-reseau btn-block">
							<Link to="/mon-jugement">
								<span>
									<i className="fas fa-reply" />
								</span>{" "}
								RETOUR AUX PROJETS
							</Link>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 mx-auto text-center">
						<h1>Évaluation du projet {this.props.match.params[0]}</h1>
					</div>
				</div>

				<EvaluationGrid number={this.props.match.params[0]} />
			</div>
		);
	}
}

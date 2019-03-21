import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";

class ReportsResults extends Component {
	componentDidMount = () => {};
	render() {
		const results = this.props.final.selectedFinal.reportsResults;
		const projects = this.props.project.projectsList;

		const list = Object.keys(projects).map(project => {
			const projectNumber = projects[project].number;
			console.log(results, projectNumber);

			return (
				<div className="offset-3 col-6 row ranking-row my-2 py-3">
					<div className="col-8">
						Projet {results[projectNumber] && results[projectNumber].project} |{" "}
						{projects[project].information.projectInformation.title}
					</div>
					<div className="col text-center">
						{results[projectNumber] && results[projectNumber].reportResult.toFixed(3)}
					</div>
				</div>
			);
		});
		return (
			<div className="row mx-auto center-text">
				<div className="col-12">
					<h1 className="text-center mx-auto">
						Résultats de l'évaluation des rapports écrits
					</h1>
				</div>

				<div className="col-12">
					<h4 className="text-center mx-auto">Résultat / 12</h4>
				</div>
				<div className="offset-3 col-6">
					<p className="text-center mx-auto">
						Cette note sera additionnée à la moyenne des résultats du projet dont la
						note la plus haute et la plus basse ont été retirées
					</p>
				</div>
				<div className="offset-3 col-6 row my-2 py-3">
					<div className="col-8 text-center">Projet</div>
					<div className="col text-center">Résultat</div>
				</div>
				{list}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	final: state.final,
	project: state.project
});

export default connect(
	mapStateToProps,
	{ SelectFinalById }
)(ReportsResults);

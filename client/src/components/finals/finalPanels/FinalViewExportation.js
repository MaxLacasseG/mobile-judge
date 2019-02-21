import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FinalNav from "../../pages/partials/FinalNav";

import { SelectFinalById } from "../../../store/actions/finalActions";
import isEmpty from "../../../validation/isEmpty";

class FinalViewExportation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: {},
			sortedResults: []
		};
	}

	CalculateResults = results => {
		for (let project in results) {
			//console.log(results[project]);
			this.CalculateProjectResults(project, results[project]);
		}
	};

	CalculateProjectResults = (projectNumber, projectResults) => {
		//console.log("final results", projectNumber, projectResults);
		const resultArray = Object.keys(projectResults).map(key => {
			return projectResults[key].total;
		});

		//Calc average
		const results = this.state.results;

		if (isEmpty(results[projectNumber])) {
			results[projectNumber] = {};
		}
		results[projectNumber].finalAvgResults = this.CalcAvg(resultArray);

		//Calc trimmed average
		results[projectNumber].finalTrimmedAvgResults = this.CalcTrimmedAvg(resultArray);
		this.setState({ results });
	};

	/**
	 * Calculates regular average
	 * @return float
	 */
	CalcAvg = valueArray => {
		return valueArray.reduce((total, result, index, array) => {
			total += result;
			if (index === array.length - 1) {
				return total / array.length;
			} else {
				return total;
			}
		});
	};

	/**
	 * Calculates trimmed average without min and max value
	 * @param valueArray
	 * @return float
	 */
	CalcTrimmedAvg = valueArray => {
		let array = valueArray;
		array = this.RemoveHighestJudge(array);
		array = this.RemoveLowestJudge(array);
		return this.CalcAvg(array);
	};

	/**
	 * Removes the min value of an array
	 * @param valueArray
	 * @return array    The valueArray without de min value
	 */
	RemoveLowestJudge = array => {
		array = array.sort((a, b) => {
			return a - b;
		});
		array.shift();
		return array;
	};

	/**
	 * Removes the max value of an array
	 * @param valueArray
	 * @return array    The valueArray without de max value
	 */
	RemoveHighestJudge = array => {
		array = array.sort((a, b) => {
			return a - b;
		});
		array.pop();
		return array;
	};

	SortByRanking = (results, ranking) => {
		const sortedResults = ranking.map(rank => {
			console.log(results, rank);
			return { [rank]: results[rank] };
		});

		this.setState({ sortedResults });
	};

	SortProjectByProjectNumber = e => {
		let results = this.state.results;
		if (isEmpty(results)) return;

		const direction = parseInt(e.target.dataset.direction);

		let ranking = [];
		if (direction === 1) {
			ranking = Object.keys(results).sort((a, b) => {
				return a - b;
			});
		} else if (direction === -1) {
			ranking = Object.keys(results).sort((a, b) => {
				return b - a;
			});
		}

		e.target.dataset.direction = direction * -1;
		this.SortByRanking(results, ranking);
	};

	SortProjectByAvg = e => {
		let results = this.state.results;
		if (isEmpty(results)) return;

		const direction = parseInt(e.target.dataset.direction);

		let ranking = [];
		if (direction === 1) {
			ranking = Object.keys(results).sort((a, b) => {
				return results[a].finalAvgResults - results[b].finalAvgResults;
			});
		} else {
			ranking = Object.keys(results).sort((a, b) => {
				return results[b].finalAvgResults - results[a].finalAvgResults;
			});
		}
		e.target.dataset.direction = direction * -1;
		this.SortByRanking(results, ranking);
	};

	SortProjectByTrimmedAvg = e => {
		let results = this.state.results;
		if (isEmpty(results)) return;

		const direction = parseInt(e.target.dataset.direction);

		let ranking = [];
		if (direction === 1) {
			ranking = Object.keys(results).sort((a, b) => {
				return results[a].finalTrimmedAvgResults - results[b].finalTrimmedAvgResults;
			});
		} else {
			ranking = Object.keys(results).sort((a, b) => {
				return results[b].finalTrimmedAvgResults - results[a].finalTrimmedAvgResults;
			});
		}

		e.target.dataset.direction = direction * -1;
		this.SortByRanking(results, ranking);
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;

		const arrayTest = {
			1: {
				1: { total: 50 },
				3: { total: 70 },
				6: { total: 40 },
				7: { total: 30 },
				8: { total: 20 },
				9: { total: 100 }
			},
			2: {
				1: { total: 24 },
				3: { total: 23 },
				6: { total: 20 },
				7: { total: 15 },
				8: { total: 0 },
				9: { total: 100 }
			},
			3: {
				1: { total: 67.323 },
				3: { total: 45.323 },
				6: { total: 78.323 },
				7: { total: 36.323 },
				8: { total: 97.323 },
				9: { total: 89.323 }
			},
			4: {
				1: { total: 67.1111 },
				3: { total: 45.1111 },
				6: { total: 78.1111 },
				7: { total: 36.1111 },
				8: { total: 97.1111 },
				9: { total: 89.1111 }
			},
			5: {
				1: { total: 67.999 },
				3: { total: 45.999 },
				6: { total: 78.999 },
				7: { total: 36.999 },
				8: { total: 97.999 },
				9: { total: 89.999 }
			}
		};

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Exportation" id={id} finalName={final.longName} />
				<div className="container ">
					<div className="row">
						<div className="mx-auto">
							<h1>Exporter vos données</h1>
							<button
								type="button"
								className="btn btn-reseau"
								onClick={() => {
									this.CalculateResults(arrayTest);
								}}
							>
								Calculer note finale
							</button>
							{/* SORTING BTNS */}
							<button
								type="button"
								className="btn btn-reseau"
								onClick={this.SortProjectByProjectNumber}
								data-direction="1"
							>
								Trier par projet
							</button>
							<button
								type="button"
								className="btn btn-reseau"
								onClick={this.SortProjectByAvg}
								data-direction="-1"
							>
								Trier par moyenne
							</button>
							<button
								type="button"
								className="btn btn-reseau"
								onClick={this.SortProjectByTrimmedAvg}
								data-direction="-1"
							>
								Trier par moyenne intermédiaire
							</button>
						</div>
					</div>
					<div className="row">
						<div className="col">Projet</div>
						<div className="col">Moyenne</div>
						<div className="col">Moyenne intermédiaire</div>
					</div>
				</div>
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
	{ SelectFinalById }
)(FinalViewExportation);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FinalNav from "../../pages/partials/FinalNav";

import { SelectFinalById } from "../../../store/actions/finalActions";
import { SelectProjectsByFinalId } from "../../../store/actions/projectActions";
import isEmpty from "../../../validation/isEmpty";

class FinalViewExportation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: {},
			sortedResults: []
		};
	}

	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
	};

	CalculateResults = results => {
		for (let project in results) {
			this.CalculateProjectResults(project, results[project]);
		}
	};

	CalculateProjectResults = (projectNumber, projectResults) => {
		console.log("final results", projectNumber, projectResults);
		const resultArray = Object.keys(projectResults).map(key => {
			return projectResults[key].total;
		});

		const results = this.state.results;
		if (isEmpty(results[projectNumber])) {
			results[projectNumber] = {};
		}
		results[projectNumber].individualResults = projectResults;

		//Calc average
		results[projectNumber].finalAvgResults = this.CalcAvg(resultArray);

		//Calc trimmed average
		results[projectNumber].finalTrimmedAvgResults = this.CalcTrimmedAvg(resultArray);

		this.setState({ results }, () => {
			this.SortProjectByDefault();
		});
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
			return { [rank]: results[rank] };
		});

		this.setState({ sortedResults });
	};

	SortProjectByDefault = () => {
		let results = this.state.results;
		if (isEmpty(results)) return;

		let ranking = [];
		ranking = Object.keys(results).sort((a, b) => {
			return results[b].finalAvgResults - results[a].finalAvgResults;
		});

		this.ResetDirection();

		const defaultBtn = document.querySelector(".sort-default");
		defaultBtn.classList.add("sort-active");
		this.FlipIconDirection(defaultBtn);

		this.SortByRanking(results, ranking);
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

		this.ResetDirection();
		e.target.dataset.direction = direction * -1;
		e.target.classList.add("sort-active");
		this.FlipIconDirection(e.target);
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
		this.ResetDirection();
		e.target.dataset.direction = direction * -1;
		e.target.classList.add("sort-active");
		this.FlipIconDirection(e.target);
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
		this.ResetDirection();
		e.target.dataset.direction = direction * -1;
		e.target.classList.add("sort-active");
		this.FlipIconDirection(e.target);
		this.SortByRanking(results, ranking);
	};

	FlipIconDirection = elem => {
		elem.classList.remove("sort-up", "sort-down");
		elem.dataset.direction == 1
			? elem.classList.add("sort-up")
			: elem.classList.add("sort-down");
	};

	ResetDirection = () => {
		document.querySelectorAll(".btn-sort").forEach(elem => {
			elem.classList.remove("sort-active");
			elem.dataset.direction = 1;
			this.FlipIconDirection(elem);
		});
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;

		const results = isEmpty(this.props.final.selectedFinal.results)
			? []
			: this.props.final.selectedFinal.results;

		const list = this.state.sortedResults.map((result, index) => {
			let number, avg, trimmedavg;

			Object.keys(result).map(key => {
				number = key;
				avg = result[key].finalAvgResults;
				trimmedavg = result[key].finalTrimmedAvgResults;
				return true;
			});

			return (
				<div className="col-12 row ranking-row my-2 py-3" key={index}>
					<div className="col-1 text-center">{index + 1}</div>
					<div className="col-3 text-center">{number}</div>
					<div className="col-6 text-center">{trimmedavg.toFixed(6)}</div>
				</div>
			);
		});

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Exportation" id={id} finalName={final.longName} />
				<div className="container">
					<div className="row">
						<div className="mx-auto text-center">
							<h1>Exporter vos données</h1>
						</div>
						<div className="row my-3 col-12">
							<div className="col-6 mx-auto text-center">
								<button
									type="button"
									className="btn btn-reseau btn-lg btn-block p-3"
									onClick={() => {
										this.CalculateResults(results);
									}}
								>
									<span className="text-uppercase font-weight-bold">
										Calculer le classement
									</span>
								</button>
							</div>
						</div>
						<div className="d-flex justify-content-around align-items-center col-12 my-3">
							{/* SORTING BTNS */}
							<div>
								<button
									type="button"
									className="btn btn-reseau btn-sort sort-down"
									onClick={this.SortProjectByProjectNumber}
									data-direction="1"
								>
									Trier par numéro de projet
								</button>
							</div>
							<div>
								<button
									type="button"
									className="btn btn-reseau btn-sort sort-up sort-active sort-default"
									onClick={this.SortProjectByTrimmedAvg}
									data-direction="-1"
								>
									Trier par résultat
								</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-1 text-center">Ordre</div>
						<div className="col-3 text-center">Numéro de projet</div>
						<div className="col-6 text-center">Résultat</div>
					</div>
					<div className="row mb-5">{list}</div>
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
	{ SelectFinalById, SelectProjectsByFinalId }
)(FinalViewExportation);

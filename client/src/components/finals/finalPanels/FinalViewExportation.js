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
			sortedResults: [],
			exportList: []
		};
	}

	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
	};

	FindProject = projectNumber => {
		if (isNaN(projectNumber)) return null;

		const foundProject = this.props.project.projectsList.filter(project => {
			return project.number == projectNumber;
		});
		return foundProject;
	};

	CalculateResults = results => {
		//console.log(results);
		for (let project of this.props.project.projectsList) {
			this.CalculateProjectResults(project.number, results[project.number]);
		}
	};

	CalculateProjectResults = (projectNumber, projectResults) => {
		let resultArray = [];
		let internationalResultArray = [];

		// If no results is entered returns 0
		if (projectResults === undefined || isEmpty(projectResults)) {
			resultArray = [0, 0, 0, 0, 0];
			internationalResultArray = [0, 0, 0, 0, 0];
		} else {
			//Checks all the results total for a project
			resultArray = Object.keys(projectResults)
				.filter(key => {
					return (
						projectResults[key].total !== undefined &&
						projectResults[key].total !== null
					);
				})
				.map(key => {
					return projectResults[key].total;
				});

			//Checks all the results total for a project
			internationalResultArray = Object.keys(projectResults)
				.filter(key => {
					return (
						projectResults[key].totalInternational !== undefined &&
						projectResults[key].totalInternational !== null
					);
				})
				.map(key => {
					return projectResults[key].totalInternational;
				});
		}

		if (isEmpty(resultArray)) return false;

		//Initialize result state
		const results = this.state.results;
		if (isEmpty(results[projectNumber])) {
			results[projectNumber] = {};
		}

		//Saves individual results in results state
		results[projectNumber].individualResults = projectResults;

		//CALCULATES RESULTS
		if (this.props.final.selectedFinal.level === "highschool") {
			//Calc trimmed average
			results[projectNumber].finalAvgResults = this.CalcTrimmedAvg(resultArray);
			//ADDS INTERNATIONAL RESULTS
			results[projectNumber].finalInternationalResults = this.CalcInternationalResult(
				internationalResultArray
			);
		} else if (this.props.final.selectedFinal.level === "elementary") {
			//Calc average
			results[projectNumber].finalAvgResults = this.CalcAvg(resultArray);
		}

		//SUPER EXPO-SCIENCES RESULTS
		if (this.props.final.selectedFinal.isSuperExpo) {
			//Get report results for project
			const reportResult = this.props.final.selectedFinal.reportsResults[projectNumber]
				? this.props.final.selectedFinal.reportsResults[projectNumber].reportResult
				: 0;

			// Add report result to other results
			results[projectNumber].finalAvgResults += parseFloat(reportResult);
			results[projectNumber].finalInternationalResults += parseFloat(reportResult);
		}

		//Saves to state and sort by default
		this.setState({ results }, () => {
			this.SortProjectByDefault();
		});
	};

	/**
	 * Calculates regular average
	 * @return float
	 */
	CalcAvg = valueArray => {
		//console.log("error check", valueArray);
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
		if (valueArray.length < 5) {
			//window.alert("Pas assez de juges pour calculer la moyenne intermédiaire");
			return;
		}
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

	/**
	 * Calculates the result for the international competition
	 * Doubles the animation results on 114...
	 * @param valueArray
	 * @return float
	 */
	CalcInternationalResult = valueArray => {
		return valueArray.reduce((total, result, index, array) => {
			total += result;
			if (index === array.length - 1) {
				return total / array.length;
			} else {
				return total;
			}
		});
	};

	SortByRanking = (results, ranking) => {
		const sortedResults = ranking.map(rank => {
			return { [rank]: results[rank] };
		});

		return sortedResults;
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

		this.setState({
			sortedResults: this.SortByRanking(results, ranking),
			exportList: this.SortByRanking(results, ranking)
		});
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
		this.setState({ sortedResults: this.SortByRanking(results, ranking) });
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
		this.setState({ sortedResults: this.SortByRanking(results, ranking) });
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
		this.setState({ sortedResults: this.SortByRanking(results, ranking) });
	};

	FlipIconDirection = elem => {
		elem.classList.remove("sort-up", "sort-down");
		elem.dataset.direction === 1
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

	//==============================
	// EXPORTATION SECTION
	MakeCSVFile = () => {
		const data = this.state.exportList;
		if (isEmpty(data)) return;

		//CREATE FILE
		//For each result in sortedResults
		let csv = "";
		const headers = "Rang;NoProjet;Note;Note Inter\n";
		csv += headers;
		data.map((row, index) => {
			csv += `${index + 1};`;
			for (let key in row) {
				csv += `${key};`;
				csv += `${row[key].finalAvgResults};`;
				csv += `${
					row[key].finalInternationalResults ? row[key].finalInternationalResults : 0
				}\n`;
			}
			return true;
		});

		//FORMAT FILE
		let csvToDownload = document.createElement("a");
		csvToDownload.style.display = "none";
		csvToDownload.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
		csvToDownload.target = "_blank";
		csvToDownload.download = `DonneeClassement-1.csv`;

		//DOWNLOAD FILE
		document.getElementById("linkContainer").appendChild(csvToDownload);
		csvToDownload.click();
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;

		const results = isEmpty(this.props.final.selectedFinal.results)
			? []
			: this.props.final.selectedFinal.results;

		//Prints results
		const list = this.state.sortedResults.map((result, index) => {
			let number, trimmedavg;

			//Needs to map again because result contains an object with an index which is the project number
			Object.keys(result).map(key => {
				number = key;
				trimmedavg = result[key].finalAvgResults;
				return true;
			});

			const project = this.FindProject(number);
			const title = project && project[0] && project[0].information.projectInformation.title;

			return (
				<div className="col-12 row ranking-row my-1 py-2" key={index}>
					<div className="col-2 text-center">{index + 1}</div>
					<div className="col-8 text-center">
						Projet {number} | {title}
					</div>
					<div className="col-2 text-center">
						{trimmedavg === undefined ? (
							<span>
								<i className="fas fa-exclamation-triangle" /> Pas assez de jugements
							</span>
						) : (
							trimmedavg.toFixed(3)
						)}
					</div>
				</div>
			);
		});

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Exportation" id={id} finalName={final.longName} />
				<div id="linkContainer" />
				<div className="container">
					<div className="row w-50 mx-auto mt-5">
						<div className="mx-auto text-center">
							<h1>Exporter vos données</h1>
						</div>
						<div className="row my-3 col-12">
							<div className="mx-auto text-center">
								<button
									type="button"
									className="btn btn-reseau btn-lg btn-block p-3"
									onClick={() => {
										this.CalculateResults(results);
									}}
								>
									<span className="text-uppercase font-weight-bold">
										Mettre à jour le classement
									</span>
								</button>
							</div>
						</div>
						<div className="row my-3 col-12 border-bottom pb-4">
							<div className="mx-auto text-center">
								<button
									type="button"
									className="btn btn-reseau btn-success btn-block p-3"
									onClick={this.MakeCSVFile}
								>
									<span className="text-uppercase font-weight-bold">
										Exporter en CSV
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
									onClick={this.SortProjectByAvg}
									data-direction="-1"
								>
									Trier par résultat
								</button>
							</div>
						</div>
					</div>
					<div className="row w-50 mx-auto">
						<div className="col-2 text-center">Ordre</div>
						<div className="col-8 text-center">Numéro de projet</div>
						<div className="col-2 text-center">Résultat</div>
					</div>
					<div className="row w-50 mx-auto mb-5">{list}</div>
				</div>
				<footer className="text-center">
					L'application <strong>Jugement mobile</strong> a été développée par le{" "}
					<a href="http://technoscience.ca" target="_blank" rel="noopener noreferrer">
						<em>Réseau Technoscience</em>
					</a>
					, &copy; 2019.
				</footer>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	final: state.final,
	project: state.project
});

export default connect(
	mapStateToProps,
	{ SelectFinalById, SelectProjectsByFinalId }
)(FinalViewExportation);

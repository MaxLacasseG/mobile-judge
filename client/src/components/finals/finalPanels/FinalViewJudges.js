import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SelectFinalById } from "../../../store/actions/finalActions";
import { SelectJudgesByFinalId } from "../../../store/actions/judgeActions";
import { SelectProjectsByFinalId } from "../../../store/actions/projectActions";
import AttributionRow from "../../judges/AttributionRow";

import FinalNav from "../../pages/partials/FinalNav";
import isEmpty from "../../../validation/isEmpty";

class FinalViewJudges extends Component {
	constructor(props) {
		super(props);
		this.state = {
			judgesList: []
		};
	}

	componentDidMount = () => {
		this.props.SelectFinalById(this.props.match.params[0]);
		this.props.SelectJudgesByFinalId(this.props.match.params[0]);
		this.props.SelectProjectsByFinalId(this.props.match.params[0]);
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (!isEmpty(this.props.judge.judgesList) && isEmpty(this.state.judgesList)) {
			const assignedList = this.props.judge.judgesList
				.filter(judge => {
					return judge.number !== null;
				})
				.sort((a, b) => {
					return a.number - b.number;
				});
			this.setState({
				judgesList: assignedList
			});
		}
	};

	FormatType = (type, short = false) => {
		let formattedType = "";
		switch (type) {
			case "vulgarization":
				formattedType = short ? "V" : "Vulgarisation";
				break;
			case "conception":
				formattedType = short ? "C" : "Conception";
				break;
			case "experimentation":
				formattedType = short ? "E" : "Expérimentation";
				break;
			default:
				break;
		}
		return formattedType;
	};

	FormatCategory = (category, short = false) => {
		let formattedCategory = "";
		switch (category) {
			case "health_sciences":
				formattedCategory = short ? "SS" : "Sciences de la santé";
				break;
			case "engeneering_computer_science":
				formattedCategory = short ? "INGI" : "Ingénierie et sciences informatiques";
				break;
			case "physics_mathematic_sciences":
				formattedCategory = short ? "SPM" : "Sciences physiques et mathématiques";
				break;
			case "earth_environment_sciences":
				formattedCategory = short ? "STE" : "Sciences de la Terre et de l'environnement";
				break;
			case "human_social_sciences":
				formattedCategory = short ? "SH" : "Sciences humaines et sociales";
				break;
			case "life_sciences":
				formattedCategory = short ? "SV" : "Sciences de la vie";
				break;
			default:
				break;
		}
		return formattedCategory;
	};

	CreateTableHeader = () => {
		let cols = [];
		for (let i = 0; i < 8; i++) {
			cols.push(
				<div key={i} className="col grid-cell-header">
					{" "}
					Période {String.fromCharCode(65 + i)}
				</div>
			);
		}
		return cols;
	};

	render() {
		const id = this.props.match.params[0];
		const final = this.props.final.selectedFinal;
		const judges = this.state.judgesList;

		const judgesList = judges.map((judge, index) => {
			const attributionInfos = isEmpty(final.pairing)
				? {}
				: final.pairing.pairingByJudges[judge.number];

			return (
				<Fragment key={`${judge.judgeId}${index}`}>
					<div className="projectsListItem row" data-projectrow={judge.number}>
						{/** PROJECT INFOS COLUMN */}
						<div className="col-md-3 row">
							<div className="col-1">
								<strong>
									{judge.number === null ? (
										<i
											className="fas fa-exclamation-triangle text-danger"
											title="Numéro non attribué"
										/>
									) : (
										judge.number
									)}
								</strong>
							</div>
							<div className="col-md">
								{`${judge.information.generalInformation.firstName} ${
									judge.information.generalInformation.lastName
								}`}
							</div>
							<div className="col-md-1">
								<strong>
									<i className="fas fa-ellipsis-v" />
								</strong>
							</div>
						</div>

						{/** PAIRING COLUMNS */}
						<div className="col-md row">
							<AttributionRow
								number={judge.number}
								attributionInfos={attributionInfos}
								minJudges="5"
								results={final.results}
							/>
						</div>
					</div>
				</Fragment>
			);
		});

		return (
			<Fragment>
				<FinalNav pageTitle="Finale - Vue par juges" id={id} finalName={final.longName} />
				<div className="p-5 ">
					{/* HEADER */}
					<div className="row">
						<div className="col-3 row" />
						<div className="col row">{this.CreateTableHeader()}</div>
					</div>
					{judgesList}
				</div>
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	final: state.final,
	project: state.project,
	judge: state.judge
});

export default connect(
	mapStateToProps,
	{ SelectFinalById, SelectJudgesByFinalId, SelectProjectsByFinalId }
)(FinalViewJudges);

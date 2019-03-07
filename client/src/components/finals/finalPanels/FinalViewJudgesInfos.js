import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { GetJudgesPwd, SetJudgeNumber } from "../../../store/actions/judgeActions";

class FinalViewJudgesInfos extends Component {
	componentDidMount = () => {
		//console.log(this.props);
		this.props.GetJudgesPwd(this.props.final.selectedFinal._id);
	};

	componentWillUnmount = () => {};

	ToggleBlur = e => {
		const nextField = e.target.parentNode.parentNode.nextSibling;
		const blurState = nextField.classList.contains("pwd");
		document.querySelectorAll("div.judge-pwd").forEach(elem => {
			elem.classList.add("pwd");
		});

		blurState ? nextField.classList.remove("pwd") : nextField.classList.add("pwd");
	};

	SortNullNumber = () => {
		return (a, b) => {
			if (a.number === null) {
				return 1;
			} else if (b.number === null) {
				return -1;
			}
		};
	};

	OnHandleClick = e => {
		//console.log(e.currentTarget.contentEditable);
		const target = e.currentTarget.parentNode.parentNode;
		target.isContentEditable === true ? this.EditModeOff(target) : this.EditModeOn(target);
	};

	EditModeOn = target => {
		this.ResetAll();
		const icon = target.querySelector(".edit-icon");
		icon.classList.remove("fa-edit");
		icon.classList.add("fa-save");
		target.classList.add("edit-mode");
		target.contentEditable = "true";
	};

	EditModeOff = target => {
		const icon = target.querySelector(".edit-icon");
		icon.classList.remove("fa-save");
		icon.classList.add("fa-edit");
		target.classList.remove("edit-mode");
		target.contentEditable = "false";
		//console.log(target.innerText, target.dataset.judgeid, this.props.final.selectedFinal._id);
		this.props.SetJudgeNumber(
			target.innerText,
			target.dataset.judgeid,
			this.props.final.selectedFinal._id
		);
	};

	ResetAll = () => {
		const elems = document.querySelectorAll(".edit-mode");
		for (let elem of elems) {
			this.EditModeOff(elem);
		}
	};

	render() {
		const judges = this.props.judge.judgesList.sort(this.SortNullNumber());

		const infosList = judges.map(judge => {
			return (
				<div className="row judge-row pb-3" key={judge._id}>
					<div
						className="col-md-1 judge-col username"
						data-number={judge.number}
						data-judgeid={judge.judgeId}
					>
						{" "}
						<span>
							<i
								onClick={this.OnHandleClick}
								className="p-2 mr-2 edit-icon fas fa-edit"
							/>
						</span>
						{judge.number}
					</div>
					<div className="col-md judge-col username">
						{judge.information.generalInformation.firstName}{" "}
						{judge.information.generalInformation.lastName}
					</div>
					<div className="col-md-2 judge-col username">
						{judge.information.generalInformation.phone.phoneMobile}
					</div>
					<div className="col-md judge-col username">{judge.username}</div>
					<div className="col-md-2 row judge-col">
						<div className="mr-3 px-3">
							<span>
								<i onClick={this.ToggleBlur.bind(this)} className="fas fa-eye" />
							</span>
						</div>
						<div className=" judge-pwd pwd">{judge.pwd}</div>
					</div>
				</div>
			);
		});
		return (
			<Fragment>
				<div className="row judge-row px-3 mb-3">
					<div className="col-md-1 text-center">Numéro du juge</div>
					<div className="col-md text-center">Nom</div>
					<div className="col-md-2 text-center">Téléphone mobile</div>
					<div className="col-md text-center">Nom d'utilisateur</div>
					<div className="col-md-2 text-center">Mot de passe</div>
				</div>
				<div className="mb-3">{infosList}</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	final: state.final,
	judge: state.judge
});

export default connect(
	mapStateToProps,
	{ GetJudgesPwd, SetJudgeNumber }
)(FinalViewJudgesInfos);

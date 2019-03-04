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

	ChangeNumber = e => {
		this.ResetAll();
		e.currentTarget.classList.add("edit-mode");
		e.currentTarget.contentEditable = true;
	};
	ResetAll = () => {
		const elems = document.querySelectorAll(".edit-mode");
		for (let elem of elems) {
			console.log("new number", elem);
			elem.classList.remove("edit-mode");
			elem.contentEditable = false;
			console.log(elem.innerText, elem.dataset.id, this.props.final.selectedFinal.id);
			//this.SetJudgeNumber(elem.dataset.innerText,)
		}
	};

	render() {
		const judges = this.props.judge.judgesList.sort(this.SortNullNumber());

		const infosList = judges.map(judge => {
			return (
				<div className="row judge-row px-3 mb-3" key={judge._id}>
					<div
						className="col-md-4 judge-col username"
						onDoubleClick={this.ChangeNumber}
						onBlur={this.SaveNewNumber}
						data-number={judge.number}
						data-id={judge.id}
					>
						{judge.number}
					</div>
					<div className="col-md-4 judge-col username">{judge.username}</div>
					<div className="col-md-4 row judge-col">
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
					<div className="col-md-4 text-center">Numéro du juge</div>
					<div className="col-md-4 text-center">Nom d'utilisateur</div>
					<div className="col-md-4 text-center">Mot de passe</div>
				</div>
				{infosList}
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

import React, { Component } from "react";
import EvaluationButtonGroup from "./EvaluationButtonGroup";
import classnames from "classnames";
export default class EvaluationCriterion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			completed: false
		};
	}

	OnCompleteCriterion = target => {
		this.props.OnHandleInput(target);
		this.setState({ [target.name]: target.value });
	};
	render() {
		const subsection = this.props.subsection;
		const criterionsList = subsection.criterions.map((criterion, index) => {
			return (
				<div className="row my-2 py-2" key={index}>
					<div className="col-md-12 row">
						<div className="col-1">
							{/* shows checkmark when completed */}
							{this.state[criterion.id] && (
								<span className="criterion-check">
									<i className="fas fa-check" />
								</span>
							)}
						</div>
						<div
							className={classnames("col-9", {
								"criterion-check": this.state[criterion.id]
							})}
						>
							{criterion.description}
						</div>
						<div className="col-1">{criterion.percentage}%</div>
						<div className="col-12 row">
							<div className="col-1" />
							<div className="col-10">
								{criterion.notes && (
									<span className="criterion-notes">
										<small>{criterion.notes}</small>
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="col-md-12">
						<EvaluationButtonGroup
							name={criterion.name}
							id={criterion.id}
							OnCompleteCriterion={this.OnCompleteCriterion}
						/>
					</div>
				</div>
			);
		});

		return (
			<div className="evaluation-subsection px-4 pt-4">
				<h5 className="">
					<strong>
						{subsection.name} - {subsection.percentage}%
					</strong>
				</h5>
				{criterionsList}
			</div>
		);
	}
}

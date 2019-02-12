import React, { Component } from "react";
import EvaluationButtonGroup from "./EvaluationButtonGroup";
export default class EvaluationCriterion extends Component {
	render() {
		const subsection = this.props.subsection;
		const criterionsList = subsection.criterions.map((criterion, index) => {
			return (
				<div className="row mb-2" key={index}>
					<div className="col-md-12">
						{criterion.description} - {criterion.percentage}%
					</div>
					<div className="col-md-12">
						{criterion.notes && <small>{criterion.notes}</small>}
					</div>
					<div className="col">
						<div className="form-group">
							<EvaluationButtonGroup name={criterion.name} />
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="evaluation-subsection p-4">
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

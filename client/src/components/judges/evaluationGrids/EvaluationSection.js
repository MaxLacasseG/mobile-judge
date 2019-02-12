import React, { Component } from "react";
import Criterions from "./EvaluationCriterion";

export default class EvaluationSection extends Component {
	render() {
		const section = this.props.section;
		const criterionsList = section.subsections.map((subsection, index) => {
			return (
				<Criterions
					subsection={subsection}
					key={index}
					OnHandleInput={this.props.OnHandleInput}
				/>
			);
		});
		return (
			<div className="evaluation-section my-3">
				<div className="row">
					<div className="col-md-8 mx-auto text-center">
						<h2>
							Section {section.name.toLowerCase()} - {section.percentage}%
						</h2>
					</div>
				</div>

				{criterionsList}
			</div>
		);
	}
}

import React, { Component } from "react";
import FinalListItem from "./FinalListItem";
export default class FinalsList extends Component {
    ToggleActivationFinal = id => {
        console.log(id);
    };
    render() {
        const dummyFinal = [
            { _id: "135454", name: "TEST", isActive: true, level: "elementary", date: "2019-03-25" },
            { _id: "455647", name: "TEST", isActive: false, level: "elementary", date: "2019-03-25" }
        ];

        const finalListItems = dummyFinal.map(final => {
            return <FinalListItem key={final._id} final={final} ToggleActivationFinal={this.ToggleActivationFinal} />;
        });
        return (
            <div className="p-5">
                <h4 className="section-header">
                    <i className="fas fa-list-ul" />
                    {"  "}
                    Vos finales
                </h4>
                <div className="list-group list-group-flush">{finalListItems}</div>
            </div>
        );
    }
}

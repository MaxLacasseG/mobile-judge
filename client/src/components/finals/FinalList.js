import React, { Component } from "react";

export default class FinalsList extends Component {
    render() {
        return (
            <div className="p-5">
                <h4 className="section-header">
                    <i className="fas fa-list-ul" />
                    {"  "}
                    Vos finales
                </h4>
                <div className="list-group list-group-flush">{"adminListItems"}</div>
            </div>
        );
    }
}

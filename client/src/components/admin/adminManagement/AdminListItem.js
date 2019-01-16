import React, { Component } from "react";

export default class AdminListItem extends Component {
    render() {
        const { _id, email, firstName, lastName, phone, organization, isAdmin } = this.props.admin;
        return (
            <div className="row border-bottom">
                <div className="col-7">
                    <p>
                        {`${firstName} ${lastName} - ${isAdmin ? "Super admin" : "Admin"}`}
                        <br />
                        <small>{`${organization}`}</small>
                    </p>
                </div>
                <div className="col">
                    <a href={`tel:${phone}`}>
                        <i className="fas fa-phone" />
                    </a>
                </div>
                <div className="col">
                    <i className="fas fa-envelope" />
                </div>
                <div className="col">
                    <i className="fas fa-edit" />
                </div>
                <div className="col">
                    <i className="fas fa-trash" />
                </div>
            </div>
        );
    }
}

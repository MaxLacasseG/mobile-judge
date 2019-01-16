import React, { Component, Fragment } from "react";
import AdminListItem from "./AdminListItem";
class AdminList extends Component {
    render() {
        const test = {
            _id: 4565464,
            email: "mlacassegermain@technoscience.ca",
            firstName: "Maxime",
            lastName: "Lacasse",
            phone: "514 432-3849",
            organization: "Réseau Technoscience",
            isAdmin: true
        };
        const adminList = <AdminListItem admin={test} />;
        return (
            <div className="p-5">
                <h4 className="section-header">
                    <i className="fas fa-list-ul" />
                    {"  "}
                    Liste des utilisateurs
                </h4>
                <div className="list-group list-group-flush">{adminList}</div>
            </div>
        );
    }
}

export default AdminList;

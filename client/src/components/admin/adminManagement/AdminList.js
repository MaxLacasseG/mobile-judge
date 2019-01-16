import React, { Component } from "react";
import { connect } from "react-redux";
import AdminListItem from "./AdminListItem";
import { GetAllAdmins } from "../../../store/actions/adminActions";
class AdminList extends Component {
    componentDidMount = () => {
        this.props.GetAllAdmins();
    };
    DeleteAdmin = admin => {
        //Call delete action
        console.log("Delete", admin);
    };

    UpdateAdmin = admin => {
        //Call update action
        console.log("Update", admin);
    };
    render() {
        const adminList = this.props.admin.adminList;
        const adminListItems = adminList.map(admin => {
            return <AdminListItem admin={admin} UpdateAdmin={this.UpdateAdmin} DeleteAdmin={this.DeleteAdmin} key={admin._id} />;
        });
        return (
            <div className="p-5">
                <h4 className="section-header">
                    <i className="fas fa-list-ul" />
                    {"  "}
                    Liste des utilisateurs
                </h4>
                <div className="list-group list-group-flush">{adminListItems}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors,
    action: state.action
});

export default connect(
    mapStateToProps,
    { GetAllAdmins }
)(AdminList);

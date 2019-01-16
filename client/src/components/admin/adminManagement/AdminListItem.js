import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Class showing an admin item from the list
 * @props function  UpdateAdmin(id)     Update the admin
 * @props function  DeleteAdmin(id)     Deletes the admin
 * @props object    admin               the admin infos
 */
class AdminListItem extends Component {
    DeleteAdmin = e => {
        if (this.props.admin !== null && this.props.admin !== undefined) {
            this.props.DeleteAdmin(this.props.admin);
        } else {
            console.log("Err DeleteAdmin():No admin found");
        }
    };

    UpdateAdmin = e => {
        if (this.props.admin !== null && this.props.admin !== undefined) {
            this.props.UpdateAdmin(this.props.admin);
        } else {
            console.log("Err UpdateAdmin():No admin found");
        }
    };

    render() {
        const { email, firstName, lastName, phone, organization, isAdmin } = this.props.admin;
        return (
            <div className="row border-bottom">
                <div className="col-7">
                    <p>
                        {`${firstName} ${lastName} - ${isAdmin ? "Super admin" : "Admin"}`}
                        <br />
                        <small>{`${organization}`}</small>
                    </p>
                </div>
                <div className="col d-flex flew-row justify-content-around align-items-start">
                    <a className="icon-button" href={`tel:${phone}`}>
                        <i className="fas fa-phone" />
                    </a>

                    <a className="icon-button" href={`mailto:${email}`}>
                        <i className="fas fa-envelope" />
                    </a>
                    <button className="icon-button" onClick={this.UpdateAdmin}>
                        <i className="fas fa-edit" />
                    </button>
                    <button className="icon-button" onClick={this.DeleteAdmin}>
                        <i className="fas fa-trash" />
                    </button>
                </div>
            </div>
        );
    }
}

AdminListItem.propTypes = {
    admin: PropTypes.object.isRequired,
    DeleteAdmin: PropTypes.func.isRequired,
    UpdateAdmin: PropTypes.func.isRequired
};

export default AdminListItem;

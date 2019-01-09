import React, { Component, Fragment } from "react";
import AdminNav from "../../pages/partials/AdminNav";
import NewAdminForm from "./NewAdminForm";
class AdminListPage extends Component {
    render() {
        return (
            <Fragment>
                <AdminNav />
                <div className="container ">
                    <div className="row py-5">
                        <div className="col-md-6 spliter">
                            <NewAdminForm />
                        </div>
                        <div className="col-md-6">
                            <p>UserList</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AdminListPage;

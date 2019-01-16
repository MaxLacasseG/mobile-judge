import React, { Component, Fragment } from "react";
import AdminNav from "../../pages/partials/AdminNav";
import NewAdminForm from "./NewAdminForm";
import AdminList from "./AdminList";
class AdminListPage extends Component {
    render() {
        return (
            <Fragment>
                <AdminNav pageTitle="Gestion des administrateurs" />
                <div className="container ">
                    <div className="row py-5">
                        <div className="col-md-6 spliter">
                            <NewAdminForm />
                        </div>
                        <div className="col-md-6">
                            <AdminList />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AdminListPage;

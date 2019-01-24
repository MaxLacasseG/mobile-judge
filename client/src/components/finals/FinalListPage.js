import React, { Component, Fragment } from "react";
import AdminNav from "../pages/partials/AdminNav";
import FinalList from "./FinalList";
import FinalJSONImport from "./finalImportation/FinalJSONImport";
class AdminListPage extends Component {
    render() {
        return (
            <Fragment>
                <AdminNav pageTitle="Vue de l'ensemble des finales" />
                <div className="container ">
                    <div className="row py-5">
                        <div className="col-md-6 spliter">
                            <FinalJSONImport />
                        </div>
                        <div className="col-md-6">
                            <FinalList />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AdminListPage;

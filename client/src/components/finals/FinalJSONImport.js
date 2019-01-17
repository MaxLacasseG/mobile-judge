import React, { Component, Fragment } from "react";
import NewFinalModal from "./NewFinalModal";
import { ClearResponse } from "../../store/actions/responseActions";
import isEmpty from "../../validation/isEmpty";
class FinalJSONImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalInfos: {},
            file: "",
            modal: ""
        };
    }

    ShowCreateFinalModal = admin => {
        const modal = <NewFinalModal finalInfos={this.state.finalInfos} CreateFinal={this.CreateFinal} ClearModal={this.ClearModal} />;
        this.setState({ modal }, () => {
            //Show modal box
            document.getElementById("createModalBtn").click();
        });
    };
    ClearModal = () => {
        this.setState({ modal: "" });
    };

    CreateFinal = finalInfos => {
        console.log("Final created");
    };
    OnFileSelect = e => {
        console.log(e.target.files[0].name);
        this.setState({ file: e.target.files[0] });
    };

    OnImportData = () => {
        if (this.state.file === "" || this.state.file === undefined) return;
        console.log("read file");
        var reader = new FileReader();
        var that = this;
        reader.onload = event => {
            let jsonData = reader.result;
            jsonData = JSON.parse(jsonData);
            that.setState({ finalInfos: jsonData }, () => {
                this.ShowCreateFinalModal();
            });
        };
        reader.readAsText(this.state.file);
    };
    OnSubmit = e => {
        e.preventDefault();
    };

    render() {
        return (
            <Fragment>
                {this.state.modal}
                <div className="p-5">
                    <h4 className="section-header">
                        <i className="fas fa-plus-circle" />
                        {"  "}
                        Importer une finale
                    </h4>
                    <form onSubmit={this.OnSubmit}>
                        <div className="row text-center">
                            <div className="col">
                                <label htmlFor="finalJsonImport" className="btn btn-accent2 btn-lg btn-block">
                                    Sélectionner le fichier
                                </label>
                                <input
                                    id="finalJsonImport"
                                    name="file"
                                    type="file"
                                    accept="application/json"
                                    multiple={false}
                                    onChange={this.OnFileSelect}
                                    style={{ display: "none" }}
                                />
                                <small>
                                    <i className="fas fa-exclamation-circle fa-sm" /> Veuiller choisir le fichier JSON depuis SGI
                                </small>
                            </div>
                        </div>
                        <hr />
                        <div className="row py-3">
                            <div className="col">
                                <p>
                                    <small>Nom du fichier sélectionné</small>
                                    <br />
                                    {!isEmpty(this.state.file.name) ? this.state.file.name : <em>Aucun fichier sélectionné</em>}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="submit"
                                    className="btn"
                                    name="jsonSubmit"
                                    id="jsonSubmit"
                                    value="Démarrer l'importation"
                                    onClick={this.OnImportData}
                                />
                            </div>
                        </div>
                    </form>
                    <hr />
                    <button
                        id="createModalBtn"
                        className="icon-button"
                        data-target="#createFinalModal"
                        data-toggle="modal"
                        style={{ display: "none" }}
                    />
                </div>
            </Fragment>
        );
    }
}
export default FinalJSONImport;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import JudgeNav from "./JudgeNav";
import { GetJudgeProject } from "../../store/actions/judgeActions";
import isEmpty from "../../validation/isEmpty";
class JudgeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentDidMount = () => {
        this.props.GetJudgeProject(this.props.auth.user.finalId, this.props.auth.user.number);
    };

    render() {
        const projects = this.props.project.projectsList;
        const projectList =
            projects &&
            Object.keys(projects).map(key => {
                return (
                    <div className="row" key={projects[key].project}>
                        <div className="col-md-12">
                            <span>Période {projects[key].period}</span>
                            <Link to={`/projet/${projects[key].project}`}>Juger le project {projects[key].project}</Link>
                        </div>
                    </div>
                );
            });

        return (
            <div>
                <JudgeNav />
                <h1>Mes projets à juger</h1>
                <h3>Finale de Montréal</h3>
                {projectList}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    final: state.final,
    judge: state.judge,
    project: state.project,
    error: state.error,
    message: state.message
});

export default connect(
    mapStateToProps,
    { GetJudgeProject }
)(JudgeDashboard);

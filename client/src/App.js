import "./App.scss";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store/store";
import setAuthHeader from "./utils/setAuthHeaders";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./store/actions/authActions";

//Routes Type
import SuperAdminRoute from "./components/routes/SuperAdminRoute";
import AdminRoute from "./components/routes/AdminRoute";
import JudgeRoute from "./components/routes/JudgeRoute";

//Components
//PAGES COMPONENTS
import NotFound from "./components/pages/Page404";

//FINAL MANAGEMENT COMPONENTS
import FinalViewInfos from "./components/finals/finalPanels/FinalViewInfos";
import FinalViewReports from "./components/finals/finalPanels/FinalViewReports";
import FinalViewJudges from "./components/finals/finalPanels/FinalViewJudges";
import FinalViewPeriods from "./components/finals/finalPanels/FinalViewPeriods";
import FinalViewProjects from "./components/finals/finalPanels/FinalViewProjects";
import FinalViewExportation from "./components/finals/finalPanels/FinalViewExportation";

//ADMIN COMPONENTS
import AdminLogin from "./components/admin/auth/AdminLoginForm";
import AdminListPage from "./components/admin/adminManagement/AdminListPage";
import FinalListPage from "./components/finals/FinalListPage";
//SUPERADMIN COMPONENTS

//JUDGE COMPONENTS
import JudgeLogin from "./components/judges/JudgeLogin";
import JudgeDashboard from "./components/judges/JudgeDashboard";
import JudgeForm from "./components/judges/evaluationGrids/EvaluationGrid";

//AUTH CHECK
//if there is a token already in localstorage,
//Allows to keep users info if page reloads
if (localStorage.jwtToken) {
	//Set authorization header for each request
	setAuthHeader(localStorage.jwtToken);
	//Decode user's token
	const decoded = jwt_decode(localStorage.jwtToken);
	//Set current user and authentication
	store.dispatch(setCurrentUser(decoded));

	//Checks expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		//Redirects
		window.location.href = "/";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Switch>
							{/* JUDGE ROUTES */}
							<Route exact path="/" component={JudgeLogin} />
							<JudgeRoute exact path="/mon-jugement" component={JudgeDashboard} />
							<JudgeRoute exact path="/projet/*" component={JudgeForm} />

							{/* MANAGER ROUTES */}
							<Route exact path="/admin" component={AdminLogin} />
							<AdminRoute
								exact
								path="/admin/panneau-controle"
								component={FinalListPage}
							/>
							<AdminRoute
								exact
								path="/admin/finale/*/vue-projets"
								component={FinalViewProjects}
							/>
							<AdminRoute
								exact
								path="/admin/finale/*/vue-juges"
								component={FinalViewJudges}
							/>
							<AdminRoute
								exact
								path="/admin/finale/*/vue-periodes"
								component={FinalViewPeriods}
							/>
							<AdminRoute
								exact
								path="/admin/finale/*/infos"
								component={FinalViewInfos}
							/>
							<AdminRoute exact path="/admin/finale/*/grid/*" component={JudgeForm} />
							<AdminRoute
								exact
								path="/admin/finale/*/exportation"
								component={FinalViewExportation}
							/>
							<SuperAdminRoute
								exact
								path="/admin/finale/*/rapports-ecrits"
								component={FinalViewReports}
							/>
							<SuperAdminRoute
								exact
								path="/admin/liste-admin"
								component={AdminListPage}
							/>
							{/* OTHER ROUTES*/}
							<Route path="/*" component={NotFound} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

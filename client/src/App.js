import "./App.css";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store/store";
import setAuthHeader from "./utils/setAuthHeaders";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./store/actions/authActions";

//Routes Type
import JudgeRoute from "./components/auth/Judge/JudgeRoute";
import AdminRoute from "./components/auth/Manager/AdminRoute";
import ManagerRoute from "./components/auth/Manager/ManagerRoute";

//Components
//PAGES COMPONENTS
import NotFound from "./components/pages/Page404";
import Header from "./components/pages/partials/Header";
import Nav from "./components/pages/partials/Nav";

//JUDGE COMPONENTS
import JudgeLogin from "./components/auth/Judge/JudgeLogin";
import JudgeDashboard from "./components/juges/JudgeDashboard";
import Final from "./components/finales/Finale";
import Importation from "./components/finales/Importation";
import Attribution from "./components/finales/Assignation";
import Exportation from "./components/finales/Exportation";

//MANAGER COMPONENTS
import ManagerLogin from "./components/auth/Manager/ManagerLoginForm";
import ForgotPwdForm from "./components/auth/Manager/MdpOubli";
import ResetPwdForm from "./components/auth/Manager/MdpChangement";
import ManagerDashboard from "./components/managers/ManagerDashboard";

//ADMIN COMPONENTS
import UserList from "./components/utilisateurs/UserList";

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
        window.location.href = "/connexion";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <Nav />
                        <div className="container">
                            <Switch>
                                {/* JUDGE ROUTES */}
                                <Route exact path="/" component={JudgeLogin} />
                                <JudgeRoute exact path="/juge" component={JudgeDashboard} />

                                {/* MANAGER ROUTES */}
                                <Route exact path="/admin" component={ManagerLogin} />
                                <Route exact path="/admin/oubli-mot-de-passe" component={ForgotPwdForm} />
                                <Route exact path="/admin/modification-mot-de-passe/*" component={ResetPwdForm} />
                                <ManagerRoute exact path="/admin/panneau-controle" component={ManagerDashboard} />
                                <ManagerRoute exact path="/admin/selection-finale" component={Final} />
                                <ManagerRoute exact path="/admin/importation" component={Importation} />
                                <ManagerRoute exact path="/admin/assignation" component={Attribution} />
                                <ManagerRoute exact path="/admin/exportation" component={Exportation} />

                                {/* ADMIN ROUTES */}
                                <AdminRoute exact path="/admin/utilisateur" component={UserList} />

                                <Route path="/*" component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

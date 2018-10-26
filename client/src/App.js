import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import setAuthHeader from "./utils/setAuthHeaders";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";

//Components
import Accueil from "./components/pages/Accueil";
import Page404 from "./components/pages/Page404";
import Navbar from "./components/pages/partials/Navbar";
import Bienvenue from "./components/auth/Bienvenue";
import Connexion from "./components/auth/ConnexionForm";

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
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Bienvenue />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Accueil} />
                                <Route
                                    exact
                                    path="/connexion"
                                    component={Connexion}
                                />
                                <Route
                                    exact
                                    path="/non-trouve"
                                    component={Page404}
                                />
                                <Redirect exact from="/*" to="/" />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

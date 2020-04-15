import React, {useState, useCallback} from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import ChooseParty from "./components/elections/PickParty";
import PartyResults from "./components/results/PartyResults";
import SignInUpWindow from "./components/auth/SignInUpWindow";
import {AuthContext} from "./shared/context/auth-context";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);
    const adminLogin = useCallback(() => {
        setIsAdmin(true);
    }, []);
    let routes;
    if (isAdmin) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <PartyResults/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        );
    } else if (isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <ChooseParty/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    {/*<SignInUpWindow/>*/}
                    <PartyResults/>

                </Route>
                <Redirect to="/"/>
            </Switch>
        );
    }
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            login: login,
            isAdmin: isAdmin,
            adminLogin: adminLogin
        }}>
            <Router>
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
};


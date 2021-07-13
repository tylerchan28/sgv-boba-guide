import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "../App";
import CityPage from "../components/CityPage";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import RestaurantPage from "../components/RestaurantPage";
import SignUpPage from "../components/SignUpPage";

export const history = createBrowserHistory();

const AppRouter = () => {
    
    const [currentUsername, setCurrentUsername] = useState("");

    const getUser = (entry) => {
        setCurrentUsername(entry)
        console.log("works " + currentUsername);;
    }

    return (
        <Router history={history} >
            <div>
                <Switch>
                    <Route path="/" component={App} exact={true} />
                    <Route path="/cities" component={CityPage} />
                    <Route path="/shop/:id" component={RestaurantPage} />
                    <Route path="/loginTest" render={(props) => (
                        <LoginPage getUser={getUser} {...props} />
                      )} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;
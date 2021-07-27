import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "../App";
import CityPage from "../components/CityPage";
import ConfirmVerificationPage from "../components/ConfirmVerificationPage";
import ForgotPasswordPage from "../components/ForgotPasswordPage";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import RestaurantPage from "../components/RestaurantPage";
import SignUpPage from "../components/SignUpPage";
import VerifyPage from "../components/VerifyPage";

export const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={history} >
            <div>
                <Switch>
                    <Route path="/cities/:name" component={App}  />
                    <Route path="/" component={CityPage} exact={true} />
                    <Route path="/shop/:id" component={RestaurantPage} />
                    <Route path="/forgot-password" component={ForgotPasswordPage} />
                    <Route path="/verify" component={VerifyPage} />
                    <Route path="/confirm/:id" component={ConfirmVerificationPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;
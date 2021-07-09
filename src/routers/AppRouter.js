import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import RestaurantPage from "../components/RestaurantPage";
import SignUpPage from "../components/SignUpPage";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={App} exact={true} />
                <Route path="/shop/:id" component={RestaurantPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
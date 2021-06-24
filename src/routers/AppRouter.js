import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../components/NotFoundPage";
import RestaurantPage from "../components/RestaurantPage";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={App} exact={true} />
                <Route path="/shop/:id" component={RestaurantPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
import React from "react";
import { Switch, Route } from "react-router-dom";
import EventManager from "../../components/Admin/EventManager";
import RouteNames from "./RouteNames";

function Routes() {
    return (
        <Switch>
            <Route path={RouteNames.root} component={EventManager}/>
        </Switch>
    );
}

export default Routes;
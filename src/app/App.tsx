import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Layout from "../components/Layout";
import RouteNames from "./Routes/RouteNames";

class App extends React.Component {
    public render() {
        return (
                <BrowserRouter>
                    <Route path={RouteNames.root} component={Layout}/>
                </BrowserRouter>
        );
    }
}

export default App;
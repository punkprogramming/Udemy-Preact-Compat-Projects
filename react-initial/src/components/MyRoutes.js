import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Error404 from "../screens/Error404";
import Home from "../screens/Home";
import NewSong from "../screens/NewSong";
import SongDetail from "../screens/SongDetail";

const MyRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => {
                    return <Home {...props} />
                }} />
                <Route exact path="/new/song" render={(props) => {
                    return <NewSong {...props} />
                }} />
                <Route path="/songs/:name" render={(props) => {
                    return <SongDetail {...props} />
                }} />
                <Route path="/*" render={(props) => {
                    return <Error404 {...props} />
                }} />
            </Switch>
        </Router>
    )
}

export default MyRoutes;
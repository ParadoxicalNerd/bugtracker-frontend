import * as React from "react"
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import ProjectInfoView from "../views/ProjectInfoView";
import ProjectsOverviewView from "../views/ProjectsOverviewView";
import TicketView from "../views/TicketView";

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path='/'>
                {/* TODO: Change this to actual landing page */}
                <Redirect from='/' to="/ticket/2" />
            </Route>

            <Route exact path="/projects">
                <ProjectsOverviewView />
            </Route>

            <Route path="/projects/:projectID">
                {/* TODO: Decide on best path name */}
                <ProjectInfoView />
            </Route>

            <Route path="/ticket/:ticketID">
                <TicketView />
            </Route>

            <Route path='/trash'>
                <h1>I'm a trash mamal</h1>
            </Route>
        </Switch>
    </HashRouter>
)
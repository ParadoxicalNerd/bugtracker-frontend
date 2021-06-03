import * as React from "react"
import { BrowserRouter, HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import UserContext from "../context/UserContext";
import ManageUserRolesView from "../views/ManageUserRolesView";
import ProjectInfoView from "../views/ProjectInfoView";
import ProjectsOverviewView from "../views/ProjectsOverviewView";
import TicketView from "../views/TicketView";
import UserStatsView from "../views/UserStatsView";

import Helmet from 'react-helmet'

const userID = 2

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path='/'>
                <>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                    {/* TODO: Change this to actual landing page */}
                    <div><Link to="/projects">projects</Link></div>

                    <div><Link to="/user/stats">user/stats</Link></div>

                    <div><Link to="/userroles">userroles</Link></div>
                </>
            </Route>

            <Route exact path="/projects">
                <Helmet>
                    <title>Projects Overview</title>
                </Helmet>

                <ProjectsOverviewView />
            </Route>

            <Route path="/projects/:projectID">
                <Helmet>
                    <title>Project Details</title>
                </Helmet>
                {/* TODO: Decide on best path name */}
                <ProjectInfoView />
            </Route>

            <Route path="/ticket/:ticketID">
                <Helmet>
                    <title>Ticket Details</title>
                </Helmet>
                <TicketView />
            </Route>

            <Route path="/user/stats">
                <Helmet>
                    <title>User stats</title>
                </Helmet>
                <UserContext.Provider value={userID}>
                    <UserStatsView />
                </UserContext.Provider>
            </Route>

            <Route path="/userroles">
                <Helmet>
                    <title>User roles</title>
                </Helmet>
                <ManageUserRolesView />
            </Route>

            <Route path='/trash'>
                <h1>I'm a trash mamal</h1>
            </Route>
        </Switch>
    </HashRouter>
)
import * as React from "react";
import { BrowserRouter, HashRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import UserContext from "../context/UserContext";
import ManageUserRolesView from "../views/ManageUserRolesView";
import ProjectInfoView from "../views/ProjectInfoView";
import ProjectsOverviewView from "../views/ProjectsOverviewView";
import TicketView from "../views/TicketView";
import UserStatsView from "../views/UserStatsView";
import CreatorView from "../views/CreatorView";
import NewTicketView from "../views/NewTicketView";

import Helmet from "react-helmet";
import HomeView from "../views/HomeView";

const userID = "----";
const userName = "----";

export default () => (
    <>
        <Switch>
            {/* <Route exact path="/">
                <Helmet>
                    <title>Bugtracker | Root </title>
                </Helmet>
                <RootView />
            </Route> */}

            <Route exact path={["/", "/home"]}>
                <Helmet>
                    <title>Bugtracker | Home</title>
                </Helmet>
                <UserContext.Provider value={{ userID: userID, username: userName }}>
                    <HomeView />
                </UserContext.Provider>
            </Route>

            <Route exact path="/projects">
                <Helmet>
                    <title>Bugtracker | Projects Overview</title>
                </Helmet>

                <ProjectsOverviewView />
            </Route>

            <Route path="/projects/:projectID">
                <Helmet>
                    <title>Bugtracker | Project Details</title>
                </Helmet>
                <ProjectInfoView />
            </Route>

            <Route path="/ticket/:ticketID">
                <Helmet>
                    <title>Bugtracker | Ticket Details</title>
                </Helmet>
                <TicketView />
            </Route>

            <Route path="/userstats">
                <Helmet>
                    <title>Bugtracker | User stats</title>
                </Helmet>

                <UserContext.Provider value={{ userID: userID, username: userName }}>
                    <UserStatsView />
                </UserContext.Provider>
            </Route>

            <Route path="/userroles">
                <Helmet>
                    <title>Bugtracker | User roles</title>
                </Helmet>
                <ManageUserRolesView />
            </Route>

            <Route path="/creator">
                <CreatorView />
            </Route>

            <Route path="/newTicket">
                <NewTicketView />
            </Route>

            <Route path="/trash">
                <h1>I'm a trash mamal</h1>
            </Route>
        </Switch>
    </>
);

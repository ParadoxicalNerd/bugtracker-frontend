import * as React from 'react';

import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import ProjectsController from './controller/ProjectsController'
import TicketsController from './controller/TicketsController'
import ProjectController from './controller/ProjectController'

const App = () => {
  return <>
    <h1>Global bar</h1>
    <HashRouter>
      <Switch>
        <Route exact path='/'>
          {/* TODO: Change this to actual landing page */}
          <Redirect from='/' to="/projects" />
        </Route>

        <Route exact path="/projects">
          <ProjectsController />
        </Route>

        <Route path="/projects/:projectID">
          {/* TODO: Decide on best path name */}
          <ProjectController />
        </Route>

        <Route path='/trash'>
          <h1>I'm a trash mamal</h1>
        </Route>
      </Switch>
    </HashRouter>
  </>
}

export default App;


import * as React from 'react';

import ProjectsController from './controller/ProjectsController'
import TicketsController from './controller/TicketsController'
import ProjectController from './controller/ProjectController'

const App = () => {
  return <>
    <ProjectsController />
    {/* <TicketsController userID={2} /> */}
    {/* <ProjectController projectID={"2"} /> */}
  </>
}

export default App;

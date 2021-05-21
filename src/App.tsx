
import * as React from 'react';

import ProjectOverview from './controller/ProjectsController'
import TicketsController from './controller/TicketsController'

interface Props {
  name: string
}

interface State {
  text: string
}


const App = () => {

  // const { loading, error, data } = usePostQuery(POSTS_QUERY)

  // console.log(data)

  // if (loading) return <h1>{"Loading..."}</h1>

  // return (
  //   <>
  //     <Button color="danger">Danger!</Button>

  //     {(error || data == undefined) ? (
  //       <h1>{"Standby"}</h1>
  //     ) : (
  //       data && data.allprojects.map((value: Post) => <h1>{value.name}</h1>)
  //     )}
  //   </>)

  return <TicketsController />

}

export default App;

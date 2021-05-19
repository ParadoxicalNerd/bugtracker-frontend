
import * as React from 'react';
import { hot } from "react-hot-loader/root";
import { Post, Comment, usePostQuery, POSTS_QUERY } from "./Post"

interface Props {
  name: string
}

interface State {
  text: string
}


const App = () => {

  const { loading, error, data } = usePostQuery(POSTS_QUERY)

  console.log(data)

  if (loading) return <h1>{"Loading..."}</h1>

  return (
    <>
      {(error || data == undefined) ? (
        <h1>{"Standby"}</h1>
      ) : (
        data && data.posts.map((value: Post) => <h1>{value.title}</h1>)
      )}
    </>)

}

export default hot(App);

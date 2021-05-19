
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
  // const [text, updateText] = React.useState("")

  const { loading, error, data } = usePostQuery(POSTS_QUERY)

  console.log(data)

  if (loading) return <h1>{"Loading..."}</h1>

  // if (error) return <h1>{"Some error occured"}</h1>

  // if (data && data[0]) return <h1>{data[0].title}</h1>

  return (
    <>
      {(error || data == undefined) ? (
        <h1>{"Standby"}</h1>
      ) : (
        data && data.posts.map((value: Post) => <h1>{value.title}</h1>)
      )}
    </>)

}

// class App extends React.Component<Props, State> {

//   constructor(props: Props) {
//     super(props)
//     this.state = { text: "" }
//     this.componentDidMount = this.componentDidMount.bind(this)
//   }

//   async componentDidMount() {
//     // let response: Response = await fetch("https://mockend.com/ParadoxicalNerd/bugtracker-fronend/posts/2")
//     // let data: Post = await response.json()
//     // console.log(data)
//     // this.setState(prevstate => {
//     //   return {
//     //     ...prevstate,
//     //     text: data.title
//     //   }
//     // })

//     const { loading, error, data } = usePostQuery(POSTS_QUERY)

//     if (loading) this.setState({ text: "Loading..." })
//     if (error) this.setState({ text: "Unexpected error occured" })

//     if (data) this.setState({ text: data[0].title })

//   }

//   render() {
//     const { name } = this.props;
//     return (
//       <>
//         <h1>
//           Hello {this.state.text}
//         </h1>
//       </>
//     );
//   }
// }

export default hot(App);

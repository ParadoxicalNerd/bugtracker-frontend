import * as React from "react"
import UserContext from "../context/UserContext"
import UserStatsView from "./UserStatsView"

export default () => {
    const { username: _username } = React.useContext(UserContext)
    // debugger
    return (
        <>
            <h1>Hello {_username}</h1>
            <UserStatsView />
        </>
    )
}
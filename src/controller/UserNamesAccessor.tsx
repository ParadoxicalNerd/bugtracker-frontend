import * as React from "react"
import { useQuery } from "urql";
import { Project, User } from "../models";

const USER_NAMES_QUERY = `
    {
        allUsers{
            id
            name
        }
    }
`

const useUsernamesAccessor = () => {
    const [result, reexecuteQuery] = useQuery<{ allUsers: [User] }>({ query: USER_NAMES_QUERY })
    return { ...result }
}

export default useUsernamesAccessor
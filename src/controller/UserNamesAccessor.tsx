import * as React from "react"
import { useQuery } from "urql";
import { Project } from "../models";

const USER_NAMES_QUERY = `
    {
        allUsers{
            id
            name
        }
    }
`

const useUsernamesAccessor = () => {
    const [result, reexecuteQuery] = useQuery<{ allProjects: [Project] }>({ query: USER_NAMES_QUERY })
    return { ...result }
}

export default useUsernamesAccessor
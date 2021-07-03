import * as React from "react"
import { useQuery } from "urql";
import { Project } from "../models";

const PROJECTS_QUERY = `
    {
        allProjects{
            id
            name
        }
    }
`

const useProjectNamesInfoQuery = () => {
    const [result, reexecuteQuery] = useQuery<{ allProjects: [Project] }>({ query: PROJECTS_QUERY })
    return { ...result }
}

export default useProjectNamesInfoQuery
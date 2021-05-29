import * as React from "react"
import { useQuery } from "urql";
import { Project } from "../models/Project";

const PROJECTS_QUERY = `
    {
        allProjects{
            id
            name
            description
            createdBy {
                name
            }
            creationDate
        }
    }
`

const useProjectsInfoQuery = () => {
    const [result, reexecuteQuery] = useQuery<{ allProjects: [Project] }>({ query: PROJECTS_QUERY })
    return { ...result }
}

export default useProjectsInfoQuery
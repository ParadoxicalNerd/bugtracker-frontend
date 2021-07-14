import * as React from "react"
import { useQuery } from "urql";
import { Project } from "../models";

const PROJECTS_QUERY = `
    {
        allProjects{
            id
            name
            description
            author {
                name
            }
            creationDate
        }
    }
`

const projectsInfoAccessor = () => {
    const [result, executeQuery] = useQuery<{ allProjects: [Project] }>({ query: PROJECTS_QUERY })
    return { ...result }
}

export default projectsInfoAccessor
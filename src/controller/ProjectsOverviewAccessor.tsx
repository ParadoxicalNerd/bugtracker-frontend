import * as React from "react"
import { DocumentNode, gql, useQuery } from "@apollo/client";
import { Project } from "../models/Project";

const PROJECTS_QUERY = gql`
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
    const { loading, error, data } = useQuery<{ allProjects: [Project] }>(PROJECTS_QUERY)
    return { loading, error, data }
}

export default useProjectsInfoQuery
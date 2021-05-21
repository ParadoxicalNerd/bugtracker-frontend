import * as React from "react"
import { DocumentNode, gql, useQuery } from "@apollo/client";
import { Project } from "../models/Project";
import { Table } from "reactstrap";
import { ProjectsView } from "../views/ProjectsView";

const PROJECT_QUERY = gql`
    {
        allProjects{
            name
            description
            createdBy {
                name
            }
            creationDate
        }
    }
`

const useProjectsQuery = (query: DocumentNode) => {
    const { loading, error, data } = useQuery<{ allProjects: [Project] }>(query)
    return { loading, error, data }
}

const ProjectsController = () => {

    const { data, error, loading } = useProjectsQuery(PROJECT_QUERY)

    console.log(data)

    if (loading) return <div>Loading Projects...</div>

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && <ProjectsView allProjects={data.allProjects} />
            }
        </>
    )
}

export default ProjectsController
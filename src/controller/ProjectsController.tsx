import * as React from "react"
import { DocumentNode, gql, useQuery } from "@apollo/client";
import { Project } from "../models/Project";
import { Spinner, Table } from "react-bootstrap";
import { ProjectsView } from "../views/ProjectsView";

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

const useProjectsQuery = (query: DocumentNode) => {
    const { loading, error, data } = useQuery<{ allProjects: [Project] }>(query)
    return { loading, error, data }
}

const ProjectsController = () => {

    const { data, error, loading } = useProjectsQuery(PROJECTS_QUERY)

    // console.log(data)

    if (loading) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && <ProjectsView allProjects={data.allProjects} />
            }
        </>
    )
}

export default ProjectsController
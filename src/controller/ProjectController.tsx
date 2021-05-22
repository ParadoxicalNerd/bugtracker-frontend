import * as React from "react"
import { DocumentNode, gql, useQuery } from "@apollo/client";
import { Project } from "../models/Project";
import { Spinner, Table } from "react-bootstrap";
import { ProjectView } from "../views/ProjectView";

const PROJECT_QUERY = gql`
query ProjectQuery($ID:ID){
    project(id:$ID){
      id
      name
      description
      associatedUsers{
        name
        email
      }
      tickets{
        title
        createdBy {
          name
        }
        assignedTo {
          name
        }
        status
        creationDate
      }
    }
  }
`

const useProjectQuery = (query: DocumentNode, projectID: string) => {
  const { loading, error, data } = useQuery<{ project: Project }>(query, { variables: { ID: projectID } })
  return { loading, error, data }
}

const ProjectController = (props: { projectID: string }) => {

  const { data, error, loading } = useProjectQuery(PROJECT_QUERY, props.projectID)

  // console.log(data)

  if (loading) return <Spinner animation="border" variant="primary" />

  return (
    <>
      {(error || data == undefined) ? <h1>Unexpected Error</h1> :
        data && <ProjectView project={data.project} />
      }
    </>
  )
}

export default ProjectController
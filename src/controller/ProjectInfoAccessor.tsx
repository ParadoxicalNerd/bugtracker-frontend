import * as React from "react"
import { DocumentNode, gql, useQuery } from "@apollo/client";
import { Project } from "../models/Project";

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
        id
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

const useProjectInfoAccessor = (projectID: string) => {
  const { loading, error, data } = useQuery<{ project: Project }>(PROJECT_QUERY, { variables: { ID: projectID } })
  return { loading, error, data }
}

export default useProjectInfoAccessor
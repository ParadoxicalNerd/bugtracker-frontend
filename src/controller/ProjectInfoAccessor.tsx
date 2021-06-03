import * as React from "react"
import { useQuery } from 'urql'
import { Project } from "../models/Project";

const PROJECT_QUERY = `
query ProjectQuery($ID:ID){
    project(id:$ID){
      id
      name
      description
      associatedUsers{
        id
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
  // const { fetching, error, data } = useQuery<{ project: Project }>(PROJECT_QUERY, { variables: { ID: projectID } })
  // return { fetching, error, data }
  const [result, reexecuteQuery] = useQuery<{ project: Project }>({ query: PROJECT_QUERY, variables: { ID: projectID } })
  // const { data, fetching, error } : { project: Project, any, any } = result;
  return result

}

export default useProjectInfoAccessor
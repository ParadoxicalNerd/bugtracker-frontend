import * as React from "react";
import { useQuery } from "urql";
import { Project } from "../models";

const PROJECT_QUERY = `
query ProjectQuery($projectID:ID!){
    project(id:$projectID){
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
        author {
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
`;

const projectInfoAccessor = (projectID: string) => {
    // const { fetching, error, data } = useQuery<{ project: Project }>(PROJECT_QUERY, { variables: { ID: projectID } })
    // return { fetching, error, data }
    const [result, executeQuery] = useQuery<{ project: Project }>({
        query: PROJECT_QUERY,
        variables: { projectID: projectID },
    });
    // const { data, fetching, error } : { project: Project, any, any } = result;
    return result;
};

export default projectInfoAccessor;

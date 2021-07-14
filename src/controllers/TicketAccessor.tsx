import * as React from 'react'
import { useQuery } from 'urql'
import { Ticket } from '../models';


const TICKET_QUERY = `
query TicketQuery ($ID:ID!) {
  ticket(id:$ID) {
    id
    title
    description
    author {
      name
    }
    assignedTo {
      name
    }
    project {
      name
      id
    }
    priority
    status
    type
    creationDate
    updateDate
    comments {
      id
      message
      creationDate
      author{
        name
      }
    }
  }
}
`

const ticketAccessor = (ticketID: string) => {
  const [result, executeQuery] = useQuery<{ ticket: Ticket }>({ query: TICKET_QUERY, variables: { ID: ticketID } })
  return { ...result }
}



export default ticketAccessor
import * as React from 'react'
import { useQuery } from 'urql'
import { Ticket } from '../models/Ticket'


const TICKET_QUERY = `
query TicketQuery ($ID:ID) {
    ticket(id:$ID) {
      id
      title
      description
      createdBy {
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
      ofType
      creationDate
      updateDate
      comments {
        id
        message
        creationDate
        createdBy{
          name
        }
      }
    }
  }
`

const ticketAccessor = (ticketID: string) => {
  const [result, reexecuteQuery] = useQuery<{ ticket: Ticket }>({ query: TICKET_QUERY, variables: { ID: ticketID } })
  return { ...result }
}



export default ticketAccessor
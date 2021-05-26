import * as React from 'react'
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { Ticket } from '../models/Ticket'


const TICKET_QUERY = gql`
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
  const { loading, error, data } = useQuery<{ ticket: Ticket }>(TICKET_QUERY, { variables: { ID: ticketID } })
  return { loading, error, data }
}



export default ticketAccessor
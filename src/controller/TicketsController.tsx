import * as React from 'react'
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { Ticket } from '../models/Ticket'
import { Spinner } from 'react-bootstrap'
import TicketsView from '../views/TicketsView'
import { User } from '../models/User'

const TICKETS_QUERY = gql`
    {
        user(id:2){
            tickets {
                priority
            }
        }
    }
`

const useTicketsQuery = (query: DocumentNode) => {
    const { loading, error, data } = useQuery<{ user: User }>(query, { variables: { ID: 3 } })
    return { loading, error, data }
}

const TicketsController = () => {
    const { data, error, loading } = useTicketsQuery(TICKETS_QUERY)

    // console.log(data)

    if (loading) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && <TicketsView tickets={data.user.tickets} />
            }
        </>
    )
}

export default TicketsController
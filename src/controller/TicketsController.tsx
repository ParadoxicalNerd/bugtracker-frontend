import * as React from 'react'
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { Ticket } from '../models/Ticket'
import { Spinner } from 'react-bootstrap'
import TicketsView from '../views/TicketsView'
import { User } from '../models/User'

const TICKETS_QUERY = gql`
    query TicketsQuery($ID:ID){
        user(id:$ID){
            tickets {
                priority
            }
        }
    }
`

const useTicketsQuery = (query: DocumentNode, userID: number) => {
    const { loading, error, data } = useQuery<{ user: User }>(query, { variables: { ID: userID } })
    return { loading, error, data }
}

const TicketsController = (props: { userID: number }) => {
    const { data, error, loading } = useTicketsQuery(TICKETS_QUERY, props.userID)

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
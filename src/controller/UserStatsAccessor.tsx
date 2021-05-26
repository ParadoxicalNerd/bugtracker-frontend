import * as React from 'react'
import { DocumentNode, gql, useQuery } from '@apollo/client'

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

const userStatsAccerssor = (userID: number) => {
    const { loading, error, data } = useQuery<{ user: User }>(TICKETS_QUERY, { variables: { ID: userID } })
    return { loading, error, data }
}


export default userStatsAccerssor
import * as React from 'react'
import { useQuery } from 'urql'

import { User } from '../models/User'

const TICKETS_QUERY = `
    query TicketsQuery($ID:ID){
        user(id:$ID){
            tickets {
                priority
            }
        }
    }
`

const userStatsAccerssor = (userID: number) => {
    const [result, reexecuteQuery] = useQuery<{ user: User }>({ query: TICKETS_QUERY, variables: { ID: userID } })
    return { ...result }
}


export default userStatsAccerssor
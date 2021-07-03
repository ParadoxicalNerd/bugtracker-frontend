import * as React from 'react'
import { useQuery } from 'urql'

import { User } from '../models';

const USERSTATS_QUERY = `
    query UserstatsQuery($ID:ID){
        user(id:$ID){
            ticketsAuthored {
                priority
                type
                status
            }
        }
    }
`

const userStatsAccerssor = (userID: string) => {
    const [result, reexecuteQuery] = useQuery<{ user: User }>({ query: USERSTATS_QUERY, variables: { ID: userID } })
    return { ...result }
}


export default userStatsAccerssor
import * as React from "react";
import { useQuery } from "urql";

import { User } from "../models";

const USERSTATS_QUERY = `
    query UserstatsQuery($userID:ID!){
        user(id:$userID){
            ticketsAuthored {
                priority
                type
                status
            }
        }
    }
`;

const userStatsAccerssor = (userID: string) => {
    const [result, executeQuery] = useQuery<{ user: User }>({
        query: USERSTATS_QUERY,
        variables: { userID },
    });
    return { ...result };
};

export default userStatsAccerssor;

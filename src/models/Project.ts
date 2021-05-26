import { DocumentNode, gql, useQuery } from '@apollo/client'

import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Project {
    id: string,
    name: string,
    description: string,
    createdBy: User,
    associatedUsers: User[],
    tickets: Ticket[],
    creationDate: Date,
    updateDate: Date
}
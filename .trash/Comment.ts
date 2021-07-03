import { User } from "./User";

export type Comment = {
    id: string
    message: string
    creationDate: Date
    authorID: string
    ticketID: string
}

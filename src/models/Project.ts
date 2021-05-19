import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Project {
    name: string,
    description: string,
    createdBy: User[],
    associatedUsers: User[],
    tickets: Ticket[]
}
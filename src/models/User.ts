import { Ticket } from "./Ticket";

export enum userTypes { FILTER, PROGRAMMER, TESTER }

export interface User {
    id: string,
    name: string,
    ofType: userTypes,
    tickets: [Ticket],
    email: string,
    creationDate: Date,
    updateDate: Date
}
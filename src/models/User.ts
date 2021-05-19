import { Ticket } from "./Ticket";

export enum userTypes { FILTER, PROGRAMMER, TESTER }

export interface User {
    name: string,
    ofType: userTypes,
    tickets: Ticket,
}
import { Ticket } from "./Ticket";

export enum userTypes { ADMIN = "ADMIN", DEVELOPER = "DEVELOPER", PROGRAMMER = "PROGRAMMER", TESTER = "TESTER" }

export const userTypesArray = ["ADMIN", "DEVELOPER", "PROGRAMMER", "TESTER"]

export interface User {
    id: string,
    name: string,
    ofType: userTypes,
    tickets: [Ticket],
    email: string,
    creationDate: Date,
    updateDate: Date
}
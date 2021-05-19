import { Project } from "./Project";
import { User } from "./User";

export enum ticketTypes { BUG, FEATURE, DOCS }
export enum ticketStatus { OPEN, ASSIGNED, TESTING, RESOLVED }
export enum ticketPriority { UNKNOWN, LOW, MEDIUM, HIGH, CRITICAL }

export interface Ticket {
    title: string,
    description: string,
    ofType: ticketTypes,
    status: ticketStatus,
    priority: ticketPriority,
    project: Project,
    createdBy: User[],
    assignedTo: User[],
    comments: string[],
    changeLog: string[]
}
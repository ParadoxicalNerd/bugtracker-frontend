import { Project } from "./Project";
import { User } from "./User";

export enum ticketTypes { BUG = 'BUG', FEATURE = 'FEATURE', DOCS = 'DOCS' }
export enum ticketStatus { OPEN = 'OPEN', ASSIGNED = 'ASSIGNED', TESTING = 'TESTING', RESOLVED = 'RESOLVED' }
export enum ticketPriority { UNKNOWN = 'UNKNOWN', LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL' }

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
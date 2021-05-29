import { Project } from "./Project";
import { User } from "./User";
import { Comment } from "./Comment"

export enum ticketTypes { BUG = 'BUG', FEATURE = 'FEATURE', DOCS = 'DOCS' }
export enum ticketStatus { OPEN = 'OPEN', ASSIGNED = 'ASSIGNED', TESTING = 'TESTING', RESOLVED = 'RESOLVED' }
export enum ticketPriority { UNKNOWN = 'UNKNOWN', LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL' }

export const ticketPriorityArray = [ticketPriority.CRITICAL, ticketPriority.LOW, ticketPriority.MEDIUM, ticketPriority.HIGH]
export const ticketStatusArray = [ticketStatus.ASSIGNED, ticketStatus.OPEN, ticketStatus.RESOLVED, ticketStatus.TESTING]
export const ticketTypesArray = [ticketTypes.BUG, ticketTypes.DOCS, ticketTypes.FEATURE]

export interface Ticket {
    id: string,
    title: string,
    description: string,
    ofType: ticketTypes,
    status: ticketStatus,
    priority: ticketPriority,
    project: Project,
    createdBy: User,
    assignedTo: User,
    comments: Comment[],
    changeLog: string[],
    creationDate: Date,
    updateDate: Date
}

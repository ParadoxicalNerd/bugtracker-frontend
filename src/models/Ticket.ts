import gql from "graphql-tag";
import { Project } from "./Project";
import { User } from "./User";
import { Comment } from "./Comment"

export enum ticketTypes { BUG = 'BUG', FEATURE = 'FEATURE', DOCS = 'DOCS' }
export enum ticketStatus { OPEN = 'OPEN', ASSIGNED = 'ASSIGNED', TESTING = 'TESTING', RESOLVED = 'RESOLVED' }
export enum ticketPriority { UNKNOWN = 'UNKNOWN', LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL' }

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

import { User } from "./User";

export interface Comment {
    id: string,
    message: string,
    creationDate: Date,
    createdBy: User
}
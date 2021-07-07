export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  message: Scalars['String'];
  creationDate: Scalars['Date'];
  author: User;
  ticket: Ticket;
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Project related mutations */
  createProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  addProjectAssociatedUsers?: Maybe<Project>;
  /** Ticket related mutations */
  createTicket?: Maybe<Ticket>;
  updateTicket?: Maybe<Ticket>;
  assignTicket?: Maybe<Ticket>;
  addTicketComment?: Maybe<Comment>;
  addTicketChangeLog?: Maybe<Ticket>;
  /** User related mutations */
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationCreateProjectArgs = {
  authorID: Scalars['ID'];
  data: ProjectCreateInput;
};


export type MutationUpdateProjectArgs = {
  projectID: Scalars['ID'];
  data: ProjectUpdateInput;
};


export type MutationAddProjectAssociatedUsersArgs = {
  projectID: Scalars['ID'];
  associatedUserID: Scalars['ID'];
};


export type MutationCreateTicketArgs = {
  authorID: Scalars['ID'];
  projectID: Scalars['ID'];
  data: TicketCreateInput;
};


export type MutationUpdateTicketArgs = {
  ticketID: Scalars['ID'];
  data: TicketUpdateInput;
};


export type MutationAssignTicketArgs = {
  ticketID: Scalars['ID'];
  userID: Scalars['ID'];
};


export type MutationAddTicketCommentArgs = {
  authorID: Scalars['ID'];
  ticketID: Scalars['ID'];
  comment: Scalars['String'];
};


export type MutationAddTicketChangeLogArgs = {
  ticketID: Scalars['ID'];
  changeLog: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationUpdateUserArgs = {
  userID?: Maybe<Scalars['ID']>;
  data?: Maybe<UserCreateInput>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  author: User;
  associatedUsers?: Maybe<Array<Maybe<User>>>;
  tickets?: Maybe<Array<Maybe<Ticket>>>;
  creationDate: Scalars['Date'];
  updateDate: Scalars['Date'];
};

export type ProjectCreateInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type ProjectUpdateInput = {
  description?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  ticket?: Maybe<Ticket>;
  user?: Maybe<User>;
  allProjects?: Maybe<Array<Project>>;
  allUsers?: Maybe<Array<User>>;
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QueryTicketArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: TicketTypes;
  status: TicketStatus;
  priority: TicketPriority;
  project: Project;
  author: User;
  assignedTo?: Maybe<User>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  changeLog?: Maybe<Array<Maybe<Scalars['String']>>>;
  creationDate: Scalars['Date'];
  updateDate: Scalars['Date'];
};

export type TicketCreateInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: TicketTypes;
  status: TicketStatus;
  priority: TicketPriority;
};

export enum TicketPriority {
  Unknown = 'UNKNOWN',
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
  Critical = 'CRITICAL'
}

export enum TicketStatus {
  Open = 'OPEN',
  Assigned = 'ASSIGNED',
  Testing = 'TESTING',
  Resolved = 'RESOLVED'
}

export enum TicketTypes {
  Bug = 'BUG',
  Feature = 'FEATURE',
  Docs = 'DOCS'
}

export type TicketUpdateInput = {
  description?: Maybe<Scalars['String']>;
  type?: Maybe<TicketTypes>;
  status?: Maybe<TicketStatus>;
  priority?: Maybe<TicketPriority>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  type: UserType;
  ticketsAuthored?: Maybe<Array<Maybe<Ticket>>>;
  createdProjects?: Maybe<Array<Maybe<Project>>>;
  assignedTickets?: Maybe<Array<Maybe<Ticket>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  associatedProjects?: Maybe<Array<Maybe<Project>>>;
  creationDate: Scalars['Date'];
  updateDate: Scalars['Date'];
};

export type UserCreateInput = {
  /** Doubles as user updater */
  name: Scalars['String'];
  email: Scalars['String'];
  type: UserType;
};

export enum UserType {
  Admin = 'ADMIN',
  ProjectManager = 'PROJECT_MANAGER',
  Programmer = 'PROGRAMMER',
  Tester = 'TESTER'
}

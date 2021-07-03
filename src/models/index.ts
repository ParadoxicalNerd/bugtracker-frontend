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
  ticet: Ticket;
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

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  ticket?: Maybe<Ticket>;
  user?: Maybe<User>;
  allProjects?: Maybe<Array<Project>>;
  allUsers?: Maybe<Array<User>>;
};


export type QueryProjectArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryTicketArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
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

export enum UserType {
  Admin = 'ADMIN',
  ProjectManager = 'PROJECT_MANAGER',
  Programmer = 'PROGRAMMER',
  Tester = 'TESTER'
}

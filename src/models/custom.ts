export enum UserType {
    Admin = "ADMIN",
    ProjectManager = "PROJECT_MANAGER",
    Programmer = "PROGRAMMER",
    Tester = "TESTER",
}

export enum TicketPriority {
    Unknown = "UNKNOWN",
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH",
    Critical = "CRITICAL",
}

export enum TicketStatus {
    Open = "OPEN",
    Assigned = "ASSIGNED",
    Testing = "TESTING",
    Resolved = "RESOLVED",
}

export enum TicketTypes {
    Bug = "BUG",
    Feature = "FEATURE",
    Docs = "DOCS",
}

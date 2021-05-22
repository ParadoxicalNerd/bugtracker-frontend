import * as React from 'react'
import { Card, CardGroup, Container, Table } from 'react-bootstrap'
import { Project } from '../models/Project'
import { Ticket } from '../models/Ticket'
import { User } from '../models/User'

const assignedPersonel = (associatedUsers: User[]) => (
    <Table stripped hover>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {associatedUsers.map((val: User) => (
                <tr>
                    <th style={{ fontWeight: 400 }}>{val.name}</th>
                    <th style={{ fontWeight: 400 }}>{val.email}</th>
                </tr>
            ))}
        </tbody>
    </Table>
)

const ticketsForProject = (tickets: Ticket[]) => (
    <Table stripped hover >
        <thead>
            <tr>
                <th>Title</th>
                <th>Submitter</th>
                <th>Developer(s)</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {tickets.map(ticket => (
                <tr>
                    <th style={{ fontWeight: 400 }}>{ticket.title}</th>
                    <th style={{ fontWeight: 400 }}>{ticket.createdBy.name}</th>
                    <th style={{ fontWeight: 400 }}>
                        {/* <ul className="list-unstyled">
                            {ticket.assignedTo.map(user => <li>{user.name}</li>)}
                        </ul> */}
                        {ticket.assignedTo.name}
                    </th>
                    <th style={{ fontWeight: 400 }}>{ticket.status}</th>
                    <th style={{ fontWeight: 400 }}>{ticket.creationDate}</th>
                    <th style={{ fontWeight: 400 }}>{"More Details"}</th>
                </tr>
            ))}
        </tbody>
    </Table>
)

const ProjectView = (props: { project: Project }) => (
    <Container>
        <Card>
            <Card.Body>
                <Card.Title>Details for Project # {props.project.id}</Card.Title>
                <CardGroup>
                    <Card border="light">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Project Name</Card.Subtitle>
                            <Card.Text>{props.project.name}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="light">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Project Desctiption</Card.Subtitle>
                            <Card.Text>{props.project.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Card.Body>
        </Card>

        <CardGroup>
            <Card>
                <Card.Body>
                    <Card.Title>{"Assigned Personel"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"Current Users on this project"}</Card.Subtitle>
                    {assignedPersonel(props.project.associatedUsers)}
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>{"Tickets for project"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"Summerized tickets for the project"}</Card.Subtitle>
                    {ticketsForProject(props.project.tickets)}
                </Card.Body>
            </Card>
        </CardGroup>
    </Container>
)

export { ProjectView }
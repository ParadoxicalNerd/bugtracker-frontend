import * as React from 'react'
import { Card, CardGroup, Container, Table, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Project } from '../models/Project'
import { Ticket } from '../models/Ticket'
import { User } from '../models/User'
import { useParams } from "react-router-dom";
import useProjectInfoAccessor from '../controller/ProjectInfoAccessor'

const AssignedPersonel: React.FC<{ associatedUsers: User[] }> = ({ associatedUsers }) => (
    <Table striped hover responsive>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {associatedUsers.map((user: User) => (
                <tr key={user.id}>
                    <th style={{ fontWeight: 400 }}>{user.name}</th>
                    <th style={{ fontWeight: 400 }}>{user.email}</th>
                </tr>
            ))}
        </tbody>
    </Table>
)

const TicketsForProject: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
    const history = useHistory();

    const viewTicket = (ticketID: string) => {
        history.push(`/ticket/${ticketID}`)
    }

    return (
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Submitter</th>
                    <th>Developer(s)</th>
                    <th>Status</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket.id} onClick={() => viewTicket(ticket.id)} style={{ cursor: "pointer" }}>
                        <th style={{ fontWeight: 400 }}>{ticket.title}</th>
                        <th style={{ fontWeight: 400 }}>{ticket.createdBy.name}</th>
                        <th style={{ fontWeight: 400 }}>
                            {ticket.assignedTo.name}
                        </th>
                        <th style={{ fontWeight: 400 }}>{ticket.status}</th>
                        <th style={{ fontWeight: 400 }}>{ticket.creationDate}</th>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const ProjectInfoView = (project: Project) => (
    <Container>
        <Card>
            <Card.Body>
                <Card.Title>Details for Project # {project.id}</Card.Title>
                <CardGroup>
                    <Card border="light">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Project Name</Card.Subtitle>
                            <Card.Text>{project.name}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="light">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Project Desctiption</Card.Subtitle>
                            <Card.Text>{project.description}</Card.Text>
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
                    <AssignedPersonel associatedUsers={project.associatedUsers} />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>{"Tickets for project"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"Summerized tickets for the project"}</Card.Subtitle>
                    <TicketsForProject tickets={project.tickets} />
                </Card.Body>
            </Card>
        </CardGroup>
    </Container>
)

export default () => {

    const { projectID } = useParams<{ projectID: string }>();

    const { data, error, fetching } = useProjectInfoAccessor(projectID)

    // console.log(data)

    if (fetching) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && ProjectInfoView(data.project)
            }
        </>
    )
}
import * as React from 'react'
import { Card, CardGroup, Container, Table, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Project } from '../models/Project'
import { Ticket } from '../models/Ticket'
import { User } from '../models/User'
import { useParams } from "react-router-dom";
import useProjectInfoAccessor from '../controller/ProjectInfoAccessor'

const assignedPersonel = (associatedUsers: User[]) => (
    <Table striped hover responsive>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {associatedUsers.map((val: User) => (
                <tr key={val.id}>
                    <th style={{ fontWeight: 400 }}>{val.name}</th>
                    <th style={{ fontWeight: 400 }}>{val.email}</th>
                </tr>
            ))}
        </tbody>
    </Table>
)

const ticketsForProject = (tickets: Ticket[]) => {
    const history = useHistory();

    const viewTicket = (ticketID: string) => {
        history.push(`/ticket/${ticketID}`)
    }

    console.log(tickets.map(ticket => ticket.id))

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
                    {assignedPersonel(project.associatedUsers)}
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>{"Tickets for project"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{"Summerized tickets for the project"}</Card.Subtitle>
                    {ticketsForProject(project.tickets)}
                </Card.Body>
            </Card>
        </CardGroup>
    </Container>
)

export default () => {

    const { projectID } = useParams<{ projectID: string }>();

    const { data, error, loading } = useProjectInfoAccessor(projectID)

    // console.log(data)

    if (loading) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && ProjectInfoView(data.project)
            }
        </>
    )
}
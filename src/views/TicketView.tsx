import * as React from 'react'
import { Button, Card, CardGroup, Col, Container, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { Ticket } from "../models/Ticket";

import { useParams } from 'react-router'
import { Spinner } from 'react-bootstrap'
import ticketAccessor from '../controller/TicketAccessor';

let editTicket = true

const ticketDetails = (ticket: Ticket) => (
    <Card>
        <Card.Body>
            <Row>
                <Col><Card.Title><h3>Details for ticket #{ticket.id}</h3></Card.Title></Col>
                <Col md="auto"><Button size="sm" onClick={() => editTicket = true}>Edit</Button></Col>
            </Row>
            <Container>
                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Ticket Title</Card.Title>
                                <Card.Text>{ticket.title}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Ticket Description</Card.Title>
                                <Card.Text>{ticket.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Assigned Developer</Card.Title>
                                <Card.Text>{ticket.assignedTo.name}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Submitter</Card.Title>
                                <Card.Text>{ticket.createdBy.name}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Project</Card.Title>
                                <Card.Text>{ticket.project.name}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Ticket Priority</Card.Title>
                                <Card.Text>{ticket.priority}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Ticket Status</Card.Title>
                                <Card.Text>{ticket.status}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Ticket Type</Card.Title>
                                <Card.Text>{ticket.ofType}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Created</Card.Title>
                                <Card.Text>{ticket.creationDate}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>Updated</Card.Title>
                                <Card.Text>{ticket.updateDate}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
)

const ticketComments = (ticket: Ticket) => (
    <Card>
        <Card.Body>
            <Card.Title><h3>Ticket Comments</h3></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">All comments for this ticket</Card.Subtitle>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Commenter</td>
                        <td>Message</td>
                        <td>Creation Date</td>
                    </tr>
                </thead>
                <tbody>
                    {ticket.comments.map((comment) => (
                        <tr key={comment.id}>
                            <td>{comment.createdBy.name}</td>
                            <td>{comment.message}</td>
                            <td>{comment.creationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <InputGroup>
                <FormControl
                    placeholder="Input Comment"
                    aria-label="Input Comment"
                />
                <InputGroup.Append>
                    <Button>Submit</Button>
                    {/* TODO: Implement actual functionality */}
                </InputGroup.Append>
            </InputGroup>
        </Card.Body>
    </Card>
)

const ticketEditor = (ticket: Ticket) => (
    <Container>
        <Card>
            <Card.Body>
                <Card.Title><h3>Edit Ticket</h3></Card.Title>
                <Card.Subtitle>Change Ticket Properties</Card.Subtitle>
                <Container className="my-4">
                    <Row>
                        <Col>
                            <Form.Group controlId="ticketEdit.title">
                                <Form.Label><h5 className="mb-0">Ticket Title</h5></Form.Label>
                                <Form.Control placeholder={ticket.title} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="ticketEdit.description">
                                <Form.Label><h5 className="mb-0">Ticket Description</h5></Form.Label>
                                <Form.Control as="textarea" placeholder={ticket.description} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form>
                        <Row>
                            <Col>
                                <Card border="light">
                                    <Card.Body>
                                        <Card.Title>Assigned Developer</Card.Title>
                                        <Card.Text>{ticket.assignedTo.name}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card border="light">
                                    <Card.Body>
                                        <Card.Title>Ticket Priority</Card.Title>
                                        <Card.Text>{ticket.priority}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card border="light">
                                    <Card.Body>
                                        <Card.Title>Ticket Status</Card.Title>
                                        <Card.Text>{ticket.status}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card border="light">
                                    <Card.Body>
                                        <Card.Title>Ticket Type</Card.Title>
                                        <Card.Text>{ticket.ofType}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Card.Body>
        </Card>
    </Container>
)

const ticketComponent = (ticket: Ticket) => {
    if (!editTicket) {
        return (
            <Container>
                <CardGroup>
                    {ticketDetails(ticket)}
                    {ticketComments(ticket)}
                </CardGroup>
            </Container>
        )
    } else {
        return (ticketEditor(ticket))
    }
}

export default () => {
    const { ticketID } = useParams<{ ticketID: string }>();

    const { data, error, loading } = ticketAccessor(ticketID)

    // console.log(data)

    if (loading) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && ticketComponent(data.ticket)
            }
        </>
    )
}

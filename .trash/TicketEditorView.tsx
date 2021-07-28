import * as React from "react"
import { Row } from "react-bootstrap"
import { Card, Form, Col, Container, Button } from "react-bootstrap"
import { Redirect, useHistory, useLocation, useRouteMatch } from "react-router"
import { Link } from "react-router-dom"
import { Ticket, TicketPriority, TicketStatus, TicketTypes } from "../models";
import { User } from "../models";

const ticketEditor = ({ ticket, allUsers }: { ticket: Ticket, allUsers: User[] }) => {

    let { url } = useRouteMatch()
    const history = useHistory()

    const formSubmit = () => {
        history.push(url)
        {/* TODO: Implement actual functionality */ }
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={formSubmit}>
                        <Row>
                            <Col>
                                <Card.Title><h3>Edit Ticket</h3></Card.Title>
                                <Card.Subtitle>Change Ticket Properties</Card.Subtitle>
                            </Col>
                            <Col md="auto"><Button size="sm" type="submit">Submit{/*<Link to={url}>Save</Link>*/}</Button></Col>
                        </Row>
                        <Container className="my-4">

                            <Row>
                                <Col>
                                    <Form.Group controlId="ticketEdit.title">
                                        <Form.Label className="mt-2">Ticket Title </Form.Label>
                                        <Form.Control placeholder={ticket.title} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketEdit.description">
                                        <Form.Label className="mt-2">Ticket Description </Form.Label>
                                        <Form.Control as="textarea" placeholder={ticket.description} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="ticketEdit.assignedDeveloper">
                                        <Form.Label className="mt-2">Assigned Developer </Form.Label>
                                        <Form.Control as="select" >
                                            {allUsers.map(user => (
                                                <option key={user.name}>{user.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketEdit.ticketPriority">
                                        <Form.Label className="mt-2">Ticket Priority </Form.Label>
                                        <Form.Control as="select" defaultValue={ticket.priority}>
                                            {Object.keys(TicketPriority).map(priority => (
                                                <option key={priority}>{priority}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="ticketEdit.ticketStatus">
                                        <Form.Label className="mt-2">Ticket Status </Form.Label>
                                        <Form.Control as="select" defaultValue={ticket.status}>
                                            {Object.keys(TicketStatus).map(status => (
                                                <option key={status}>{status}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketEdit.ticketType">
                                        <Form.Label className="mt-2">Ticket Type </Form.Label>
                                        <Form.Control as="select" defaultValue={ticket.type}>
                                            {Object.keys(TicketTypes).map(type => (
                                                <option key={type}>{type}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Container>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ticketEditor
import * as React from "react"
import { Card, Container, Form, Row, Col, Button } from "react-bootstrap"
import useProjectNamesInfoQuery from "../controller/ProjectNamesAccessor"
import { Project } from "../models/Project"
import { Ticket, ticketPriorityArray, ticketStatusArray, ticketTypesArray } from "../models/Ticket"
import { User } from "../models/User"

const formSubmit = () => {

}

const CreateNewTicket = ({ allProjects, allUsers }: { allProjects: Project[], allUsers: User[] }) => {

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={formSubmit}>
                        <Row>
                            <Col>
                                <Card.Title><h3>Create new ticket</h3></Card.Title>
                            </Col>
                            <Col md="auto"><Button size="sm" type="submit">Submit</Button></Col>
                        </Row>
                        <Container className="my-4">

                            <Row>
                                <Col>
                                    <Form.Group controlId="ticketEdit.title">
                                        <Form.Label className="mt-2">Ticket Title </Form.Label>
                                        <Form.Control />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketEdit.description">
                                        <Form.Label className="mt-2">Ticket Description </Form.Label>
                                        <Form.Control as="textarea" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="ticketEdit.project">
                                        <Form.Label className="mt-2">Project </Form.Label>
                                        <Form.Control as="select" >
                                            {allProjects.map(project => (
                                                <option key={project.name}>{project.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketEdit.ticketPriority">
                                        <Form.Label className="mt-2">Ticket Priority </Form.Label>
                                        <Form.Control as="select">
                                            {ticketPriorityArray.map(priority => (
                                                <option key={priority}>{priority}</option>
                                            ))}
                                        </Form.Control>
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
                                    <Form.Group controlId="ticketEdit.ticketType">
                                        <Form.Label className="mt-2">Ticket Type </Form.Label>
                                        <Form.Control as="select">
                                            {ticketTypesArray.map(type => (
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

export default () => {
    const { } = useProjectNamesInfoQuery
}
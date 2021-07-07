import { valueFromAST } from "graphql";
import * as React from "react"
import { Card, Container, Form, Row, Col, Button, Spinner, Modal } from "react-bootstrap"
import useProjectNamesInfoQuery from "../controller/ProjectNamesAccessor"
import useUsernamesAccessor from "../controller/UserNamesAccessor";
import { Project } from "../models";
import { Ticket, TicketPriority, TicketStatus, TicketTypes } from "../models";
import { User } from "../models";
import ArrayEquals from "../utils/ArrayEquals";

const CreateNewTicket = ({ allProjects, allUsers }: { allProjects: Project[], allUsers: User[] }) => {

    let hydrator = {
        title: '',
        description: '',
        project: "",
        ticketPriority: "",
        assignedDeveloper: '',
        ticketType: "",
    }

    const [formValue, setFormValue] = React.useState(hydrator)
    const [formValidated, setFormValidated] = React.useState(false)

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target: any = event.target
        setFormValue(value => ({ ...value, [target.id]: target.value }))
    }

    const formValidate = () => {

        if (ArrayEquals(Object.keys(formValue).sort(), Object.keys(hydrator).sort()) == false) {
            return false
        }

        // Check if none of the values is ''
        for (const property in formValue) {
            // @ts-expect-error
            if (formValue[property] == '') {
                return false
            }
        }

        return true

    }

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        setFormValidated(!formValidate())
        if (formValidated) {
            console.log("hi")
        }
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Row>
                            <Col>
                                <Card.Title><h3>Create new ticket</h3></Card.Title>
                            </Col>
                            <Col md="auto"><Button size="sm" type="submit">Submit</Button></Col>
                        </Row>
                        <Container className="my-4">
                            <Row>
                                <Col>
                                    <Form.Group controlId="title">
                                        <Form.Label className="mt-2">Ticket Title </Form.Label>
                                        <Form.Control value={formValue.title} onChange={onChange} placeholder="A descriptive title" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="description">
                                        <Form.Label className="mt-2">Ticket Description </Form.Label>
                                        <Form.Control as="textarea" value={formValue.description} onChange={onChange} placeholder="Detailed description of issue" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="project">
                                        <Form.Label className="mt-2">Project </Form.Label>
                                        <Form.Control as="select" value={formValue.project} onChange={onChange}>
                                            <option disabled hidden key="" value=""> Choose project </option>
                                            {allProjects.map(project => (
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketPriority">
                                        <Form.Label className="mt-2">Ticket Priority </Form.Label>
                                        <Form.Control as="select" value={formValue.ticketPriority} onChange={onChange}>
                                            <option disabled hidden key="" value=""> Choose priority</option>
                                            {Object.keys(TicketPriority).map(priority => (
                                                <option key={priority} value={priority}>{priority}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="assignedDeveloper">
                                        <Form.Label className="mt-2">Assigned Developer </Form.Label>
                                        <Form.Control as="select" value={formValue.assignedDeveloper} onChange={onChange}>
                                            <option disabled hidden key="" value=""> Choose developer </option>
                                            {allUsers.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="ticketType">
                                        <Form.Label className="mt-2">Ticket Type </Form.Label>
                                        <Form.Control as="select" value={formValue.ticketType} onChange={onChange}>
                                            <option disabled hidden key="" value=""> Choose type </option>
                                            {Object.keys(TicketTypes).map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Container>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={formValidated} onHide={() => setFormValidated(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Form validation failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure have filled in all the fields?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setFormValidated(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default () => {
    const { data: project_data, error: project_error, fetching: project_fetching } = useProjectNamesInfoQuery()

    const { data: users_data, error: users_error, fetching: users_fetching } = useUsernamesAccessor()

    if (project_fetching || users_fetching) return <Spinner animation="border" variant="primary" />

    if (project_error || users_error || project_data == undefined || users_data == undefined)
        return <h1>Undefined error</h1>

    return <CreateNewTicket allProjects={project_data.allProjects} allUsers={users_data.allUsers} />
}

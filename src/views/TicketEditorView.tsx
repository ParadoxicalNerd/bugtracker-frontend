import * as React from "react";
import { Card, Container, Form, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import UserContext from "../context/UserContext";
import projectNamesAccessor from "../controllers/ProjectNamesAccessor";
import usernamesAccessor from "../controllers/UserNamesAccessor";
import { Project, TicketUpdateInput } from "../models";
import { Ticket, TicketPriority, TicketStatus, TicketTypes, TicketCreateInput } from "../models";
import { User } from "../models";
import ticketMutator from "../controllers/TicketMutator";

import * as Joi from "joi";
import { useHistory } from "react-router";

export default ({ ticket, allUsers }: { ticket: Ticket; allUsers: User[] }) => {
    if (ticket.assignedTo === null) {
        ticket.assignedTo = undefined;
    }

    const [formValue, setFormValue] = React.useState({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        type: ticket.type,
        status: ticket.status,
        assignedTo: ticket.assignedTo,
    });
    const [formValidated, setFormValidated] = React.useState("");
    const [submissionSuccessful, setSubmissionSuccessful] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [_, updatedTicketSubmit] = ticketMutator();
    const history = useHistory();

    const formSchema = Joi.object({
        title: Joi.string().required().min(5),
        description: Joi.string().min(20),
        priority: Joi.string()
            .required()
            .valid(...Object.values(TicketPriority)),
        type: Joi.string()
            .required()
            .valid(...Object.values(TicketTypes)),
        status: Joi.string()
            .required()
            .valid(...Object.values(TicketStatus)),
        assignedTo: Joi.string()
            .when("status", {
                is: TicketStatus.Assigned,
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            })
            .valid(...allUsers.map((user) => user.id)),
    });

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target: any = event.target;

        // Reset assigned to if we change the status
        if (target.id == "status" && target.value !== TicketStatus.Assigned) {
            setFormValue((value) => ({
                ...value,
                [target.id]: target.value,
                assignedTo: undefined,
            }));
        } else {
            setFormValue((value) => ({ ...value, [target.id]: target.value }));
        }
    };

    const formValidate = () => {
        return formSchema.validate(formValue).error === undefined;
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const resultValidity = formValidate();

        setFormValidated(resultValidity.toString());

        if (resultValidity == true) {
            const ticketUpdateInput: TicketUpdateInput = {
                title: formValue.title,
                description: formValue.description,
                assignedTo: formValue.assignedTo?.id,
                priority: formValue.priority,
                status: formValue.status,
                type: formValue.type,
            };

            const variables = {
                ticketID: ticket.id,
                data: ticketUpdateInput,
            };

            updatedTicketSubmit(variables).then((result) => {
                console.log(result);

                // result.error can be undefined
                if (!result.error) {
                    setSubmissionSuccessful("true");
                } else {
                    setSubmissionSuccessful("false");
                }
            });
        } else {
            setMessage(
                formSchema.validate(formValue).error?.message ||
                    "Are you sure have filled in all the fields?"
            );
        }
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Row>
                            <Col>
                                <Card.Title>
                                    <h3>Edit ticket</h3>
                                </Card.Title>
                            </Col>
                            <Col md="auto">
                                <Button size="sm" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                        <Container className="my-4">
                            <Row>
                                <Col>
                                    <Form.Group controlId="title">
                                        <Form.Label className="mt-2">Ticket Title </Form.Label>
                                        <Form.Control
                                            value={formValue.title}
                                            onChange={onChange}
                                            placeholder="A descriptive title"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="description">
                                        <Form.Label className="mt-2">Ticket Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            value={formValue.description}
                                            onChange={onChange}
                                            placeholder="Detailed description of issue"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="priority">
                                        <Form.Label className="mt-2">Ticket Priority </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formValue.priority ? formValue.priority : ""}
                                            onChange={onChange}
                                        >
                                            <option disabled hidden key="" value="">
                                                Choose priority
                                            </option>
                                            {Object.entries(TicketPriority).map(
                                                ([priorityID, priority]) => (
                                                    <option key={priorityID} value={priority}>
                                                        {priorityID}
                                                    </option>
                                                )
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="type">
                                        <Form.Label className="mt-2">Ticket Type </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formValue.type ? formValue.type : ""}
                                            onChange={onChange}
                                        >
                                            <option disabled hidden key="" value="">
                                                Choose type
                                            </option>
                                            {Object.entries(TicketTypes).map(([typeID, type]) => (
                                                <option key={typeID} value={type}>
                                                    {typeID}
                                                </option>
                                            ))}
                                            {/* {Object.keys(TicketTypes).map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))} */}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="status">
                                        <Form.Label className="mt-2">Ticket Status </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formValue.status ? formValue.status : ""}
                                            onChange={onChange}
                                        >
                                            <option disabled hidden key="" value="">
                                                Choose status
                                            </option>
                                            {Object.entries(TicketStatus).map(
                                                ([statusID, status]) => (
                                                    <option key={statusID} value={status}>
                                                        {statusID}
                                                    </option>
                                                )
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="assignedTo">
                                        <Form.Label className="mt-2">Assigned Developer</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formValue.assignedTo ? formValue.assignedTo : ""}
                                            onChange={onChange}
                                            disabled={formValue.status != TicketStatus.Assigned}
                                        >
                                            <option disabled hidden key="" value="">
                                                Choose developer
                                            </option>
                                            {allUsers.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>

            {/* Renders only if formValidated is set to true */}
            <Modal show={formValidated == "false"} onHide={() => setFormValidated("")} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Form validation failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setFormValidated("")}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Renders only if submissionSuccessful is set to false */}
            <Modal
                show={submissionSuccessful == "false"}
                onHide={() => setSubmissionSuccessful("")}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Form submission failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Try again in a bit</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setSubmissionSuccessful("")}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Renders only if submissionSuccessful is set to true */}
            <Modal show={submissionSuccessful == "true"} centered>
                <Modal.Header>
                    <Modal.Title>Form submission successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your ticket has been modified!</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => history.push(`/ticket/${ticket.id}`)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

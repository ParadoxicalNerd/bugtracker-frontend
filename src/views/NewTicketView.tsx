import * as Joi from "joi";
import * as React from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import UserContext from "../context/UserContext";
import newTicketMutator from "../controllers/NewTicketMutator";
import projectNamesAccessor from "../controllers/ProjectNamesAccessor";
import usernamesAccessor from "../controllers/UserNamesAccessor";
import {
    Project,
    TicketCreateInput,
    TicketPriority,
    TicketStatus,
    TicketTypes,
    User,
} from "../models";

let hydrator = {
    title: "",
    description: "",
    project: undefined,
    ticketPriority: undefined,
    assignedDeveloper: undefined,
    ticketType: undefined,
    ticketStatus: undefined,
};

const CreateNewTicket = ({
    allProjects,
    allUsers,
}: {
    allProjects: Project[];
    allUsers: User[];
}) => {
    const [formValue, setFormValue] = React.useState(hydrator);
    const [formValidated, setFormValidated] = React.useState("");
    const [submissionSuccessful, setSubmissionSuccessful] = React.useState("");
    const [message, setMessage] = React.useState("");

    const { userID } = React.useContext(UserContext);
    const [_, newTicketSubmit] = newTicketMutator();
    const history = useHistory();

    const formSchema = Joi.object({
        title: Joi.string().required().min(5),
        description: Joi.string().min(20),
        project: Joi.string()
            .required()
            .valid(...allProjects.map((project) => project.id)),
        ticketPriority: Joi.string()
            .required()
            .valid(...Object.values(TicketPriority)),
        ticketType: Joi.string()
            .required()
            .valid(...Object.values(TicketTypes)),
        ticketStatus: Joi.string()
            .required()
            .valid(...Object.values(TicketStatus)),
        assignedDeveloper: Joi.string()
            .when("ticketStatus", {
                is: TicketStatus.Assigned,
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            })
            .valid(...allUsers.map((user) => user.id)),
    });

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target: any = event.target;
        setFormValue((value) => ({ ...value, [target.id]: target.value }));
    };

    const formValidate = () => {
        return formSchema.validate(formValue).error === undefined;
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const resultValidity = formValidate();

        setFormValidated(resultValidity.toString());

        if (resultValidity == true) {
            const ticketInput: TicketCreateInput = {
                title: formValue.title,
                description: formValue.description,
                // Hack to not give type errors.
                priority: formValue.ticketPriority as unknown as TicketPriority,
                status: formValue.ticketStatus as unknown as TicketStatus,
                type: formValue.ticketType as unknown as TicketTypes,
                assignedTo: formValue.assignedDeveloper,
            };

            const variables = {
                userID: userID,
                projectID: formValue.project,
                data: ticketInput,
            };

            newTicketSubmit(variables).then((result) => {
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
                                    <h3>Create new ticket</h3>
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
                                <Col>
                                    <Form.Group controlId="project">
                                        <Form.Label className="mt-2">Project </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formValue.project ? formValue.project : ""}
                                            onChange={onChange}
                                            onchange
                                        >
                                            <option disabled hidden key="" value="">
                                                Choose project
                                            </option>
                                            {allProjects.map((project) => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </Form.Control>
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
                                    <Form.Group controlId="ticketPriority">
                                        <Form.Label className="mt-2">Ticket Priority </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={
                                                formValue.ticketPriority
                                                    ? formValue.ticketPriority
                                                    : ""
                                            }
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
                                    <Form.Group controlId="ticketType">
                                        <Form.Label className="mt-2">Ticket Type </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formValue.ticketType ? formValue.ticketType : ""}
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
                                    <Form.Group controlId="ticketStatus">
                                        <Form.Label className="mt-2">Ticket Status </Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={
                                                formValue.ticketStatus ? formValue.ticketStatus : ""
                                            }
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
                                    <Form.Group controlId="assignedDeveloper">
                                        <Form.Label className="mt-2">Assigned Developer</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={
                                                formValue.assignedDeveloper
                                                    ? formValue.assignedDeveloper
                                                    : ""
                                            }
                                            onChange={onChange}
                                            disabled={
                                                formValue.ticketStatus != TicketStatus.Assigned
                                            }
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
                <Modal.Body>Your ticket has been created!</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => history.push("#/home")}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default () => {
    const {
        data: project_data,
        error: project_error,
        fetching: project_fetching,
    } = projectNamesAccessor();

    const { data: users_data, error: users_error, fetching: users_fetching } = usernamesAccessor();

    if (project_fetching || users_fetching) return <Spinner animation="border" variant="primary" />;

    if (project_error || users_error || project_data == undefined || users_data == undefined)
        return <h1>Undefined error</h1>;

    return (
        <CreateNewTicket allProjects={project_data.allProjects} allUsers={users_data.allUsers} />
    );
};

import * as React from "react";
import {
    Button,
    Card,
    CardGroup,
    Col,
    Container,
    FormControl,
    InputGroup,
    Row,
    Table,
} from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { Ticket } from "../models";

const ticketDetails = (ticket: Ticket) => {
    let { url } = useRouteMatch();

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            <h3>Details for ticket #{ticket.id}</h3>
                        </Card.Title>
                    </Col>
                    <Col md="auto">
                        <Button size="sm">
                            <Link to={`${url}?edit="true"`} className="btn btn-primary btn-sm">
                                Edit
                            </Link>
                        </Button>
                    </Col>
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
                                    <Card.Text>{ticket.assignedTo?.name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card border="light">
                                <Card.Body>
                                    <Card.Title>Submitter</Card.Title>
                                    <Card.Text>{ticket.author.name}</Card.Text>
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
                                    <Card.Text>{ticket.type}</Card.Text>
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
    );
};

const ticketComments = (ticket: Ticket, comment: string, onChange: any, onSubmit: any) => (
    <Card>
        <Card.Body>
            <Card.Title>
                <h3>Ticket Comments</h3>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">All comments for this ticket</Card.Subtitle>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <td>Commenter</td>
                        <td>Message</td>
                        <td>Creation Date</td>
                    </tr>
                </thead>
                <tbody>
                    {ticket.comments
                        ? ticket.comments.map((comment) =>
                              comment ? (
                                  <tr key={comment.id}>
                                      <td>{comment.author.name}</td>
                                      <td>{comment.message}</td>
                                      <td>{comment.creationDate}</td>
                                  </tr>
                              ) : null
                          )
                        : null}
                </tbody>
            </Table>
            <InputGroup>
                <FormControl
                    placeholder="Input Comment"
                    aria-label="Input Comment"
                    value={comment}
                    onChange={onChange}
                />
                <InputGroup.Append>
                    <Button onClick={onSubmit}>Submit</Button>
                    {/* TODO: Implement actual functionality */}
                </InputGroup.Append>
            </InputGroup>
        </Card.Body>
    </Card>
);

export default ({ ticket }: { ticket: Ticket }) => {
    const [comment, setComment] = React.useState("");

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target: any = event.target;
        setComment((val) => target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    return (
        <Container>
            <CardGroup>
                {ticketDetails(ticket)}
                {ticketComments(ticket, comment, onChange, onSubmit)}
            </CardGroup>
        </Container>
    );
};

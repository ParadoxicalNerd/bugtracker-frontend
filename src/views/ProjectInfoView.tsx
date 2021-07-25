import * as React from "react";
import { Card, CardGroup, Container, Table, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { Maybe, Project } from "../models";
import { Ticket } from "../models";
import { User } from "../models";
import { useParams } from "react-router-dom";
import projectInfoAccessor from "../controllers/ProjectInfoAccessor";

const AssignedPersonel: React.FC<{ associatedUsers: Maybe<Maybe<User>[]> | undefined }> = ({
    associatedUsers,
}) => (
    <Table striped hover responsive>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {associatedUsers
                ? associatedUsers.map((user: User | null) => {
                      user ? (
                          <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                          </tr>
                      ) : undefined;
                  })
                : undefined}
        </tbody>
    </Table>
);

const TicketsForProject: React.FC<{ tickets: Maybe<Maybe<Ticket>[]> | undefined }> = ({
    tickets,
}) => {
    const history = useHistory();

    const viewTicket = (ticketID: string) => {
        history.push(`/ticket/${ticketID}`);
    };

    console.log(tickets);

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
                {tickets!.map((ticket) => (
                    <tr
                        key={ticket?.id}
                        onClick={() => viewTicket(ticket!.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{ticket?.title}</td>
                        <td>{ticket?.author.name}</td>
                        <td>{ticket?.assignedTo ? ticket?.assignedTo.name : "Unassigned"}</td>
                        <td>{ticket?.status}</td>
                        <td>{ticket?.creationDate}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

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
                            <Card.Subtitle className="mb-2 text-muted">
                                Project Desctiption
                            </Card.Subtitle>
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
                    <Card.Subtitle className="mb-2 text-muted">
                        {"Current Users on this project"}
                    </Card.Subtitle>
                    <AssignedPersonel associatedUsers={project.associatedUsers} />
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>{"Tickets for project"}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {"Summerized tickets for the project"}
                    </Card.Subtitle>
                    <TicketsForProject tickets={project.tickets} />
                </Card.Body>
            </Card>
        </CardGroup>
    </Container>
);

export default () => {
    const { projectID } = useParams<{ projectID: string }>();

    const { data, error, fetching } = projectInfoAccessor(projectID);

    // console.log(data)

    if (fetching) return <Spinner animation="border" variant="primary" />;

    if (error || data == undefined) {
        if (process.env.NODE_ENV !== "production") console.log(error);
        return <h1>Unexpected Error</h1>;
    }

    return <>{data && ProjectInfoView(data.project)}</>;
};

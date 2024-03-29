import * as React from "react";
import { Container, FormControl, InputGroup, Table, Spinner } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import projectsInfoAccessor from "../controllers/ProjectsOverviewAccessor";
import { Project } from "../models";

const ProjectsOverviewView = () => {
    // All react hooks

    const { data, error, fetching } = projectsInfoAccessor();

    const [searchQuery, setSearchQuery] = React.useState("");

    const history = useHistory();

    // Custom rendering

    if (fetching) return <Spinner animation="border" variant="primary" />;

    if (error || data == undefined) {
        if (process.env.NODE_ENV !== "production") console.log(error);
        return <h1>Unexpected Error</h1>;
    }

    const setNewSearch = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(inputEvent.target.value || "");
    };

    const viewProject = (projectID: string) => {
        history.push(`projects/${projectID}`);
    };

    return (
        <Container className="my-auto">
            <InputGroup>
                <FormControl placeholder="Filter by project name" onChange={setNewSearch} />
            </InputGroup>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>{"Project Name"}</th>
                        <th>{"Description"}</th>
                        <th>{"Created By"}</th>
                        <th>{"Created On"}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allProjects
                        .filter((val) =>
                            val.description
                                ? val.description.toLowerCase().includes(searchQuery.toLowerCase())
                                : false ||
                                  val.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((val) => (
                            <tr
                                key={val.id}
                                onClick={() => viewProject(val.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{val.name}</td>
                                <td>{val.description}</td>
                                <td>{val.author.name}</td>
                                <td>{val.creationDate}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProjectsOverviewView;

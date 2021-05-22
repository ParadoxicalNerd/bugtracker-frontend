import * as React from 'react'
import { Container, FormControl, InputGroup, Table } from 'react-bootstrap'
import ProjectController from '../controller/ProjectController'
import { Project } from '../models/Project'

interface Props {
    allProjects: [Project];
}

const ProjectsView = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState("")

    const setNewSearch = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(inputEvent.target.value || "")
    }

    const [selectedProject, setSelectedProject] = React.useState("")

    if (selectedProject == "") {
        return (
            <Container className="my-auto">
                <InputGroup>
                    <FormControl placeholder="Filter by project name" onChange={setNewSearch} />
                </InputGroup>
                <Table hover={true}>
                    <thead>
                        <tr>
                            <th>{"Project Name"}</th>
                            <th>{"Description"}</th>
                            <th>{"Created By"}</th>
                            <th>{"Created On"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.allProjects
                                .filter(val => val.description.toLowerCase().includes(searchQuery.toLowerCase())
                                    || val.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map(val => (
                                    <tr key={val.id} onClick={() => { setSelectedProject(val.id) }}>
                                        <th>{val.name}</th>
                                        <th>{val.description}</th>
                                        <th>{val.createdBy.name}</th>
                                        <th>{val.creationDate}</th>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
            </Container>
        )
    } else {
        return (<ProjectController projectID={selectedProject} />)
    }
}

export { ProjectsView }
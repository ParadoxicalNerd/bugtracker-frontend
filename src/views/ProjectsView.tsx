import * as React from 'react'
import { Container, FormControl, InputGroup, Table } from 'react-bootstrap'
import { Project } from '../models/Project'

interface Props {
    allProjects: [Project];
}

const ProjectsView = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState("")

    const setNewSearch = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(inputEvent.target.value || "")
    }

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
                                <tr>
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
}

export { ProjectsView }
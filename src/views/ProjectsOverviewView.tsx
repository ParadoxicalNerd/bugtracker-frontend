import * as React from 'react'
import { Container, FormControl, InputGroup, Table, Spinner } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router'
import useProjectsInfoQuery from '../controller/ProjectsOverviewAccessor'
import { Project } from '../models/Project'

const projectsOverviewComponent = (allProjects: [Project]) => {
    const [searchQuery, setSearchQuery] = React.useState("")

    const setNewSearch = (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(inputEvent.target.value || "")
    }

    const history = useHistory();

    const viewProject = (projectID: string) => {
        history.push(`projects/${projectID}`)
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
                        allProjects
                            .filter(val => val.description.toLowerCase().includes(searchQuery.toLowerCase())
                                || val.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(val => (
                                <tr key={val.id} onClick={() => viewProject(val.id)} style={{ cursor: "pointer" }}>
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

export default () => {

    const { data, error, loading } = useProjectsInfoQuery()

    // console.log(data)

    if (loading) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && projectsOverviewComponent(data.allProjects)
            }
        </>
    )
}
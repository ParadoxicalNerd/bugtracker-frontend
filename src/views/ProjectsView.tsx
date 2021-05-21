import * as React from 'react'
import { Input, InputGroup, Table } from 'reactstrap'
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
        <>
            <Input placeholder="Filter by project name" onChange={setNewSearch} />
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
        </>
    )
}

export { ProjectsView }
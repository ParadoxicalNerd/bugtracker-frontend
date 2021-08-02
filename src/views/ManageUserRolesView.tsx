import * as React from "react";
import { Button, Card, CardGroup, Form, Spinner, Table } from "react-bootstrap";
import usersAccessor from "../controllers/UsersAccessor";
import { User, UserType } from "../models";

// let a;

// const onSubmit = (event: any) => {
//     const selections = event.target[0].selectedOptions
//     for (let i = 0; i < selections.length; i++) {
//         console.log((selections.item(i).value))
//     }
// }

// const onFormSubmit = (e: any) => {
//     e.preventDefault()
//     const formData = new FormData(e.target)
//     // formData.forEach(k => console.log(k.toString()))
//     // console.log("hi")
//     console.log(formData.entries())
//     let formDataObj = Object.fromEntries(formData.entries())
//     console.log(formDataObj)
// }

const ManageUserRolesView = ({ users: _users }: { users: User[] }) => {
    const [users, setUsers] = React.useState(_users);

    let formValue: { users: string[]; role: UserType } = {
        users: [],
        role: UserType.Admin,
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target: any = event.target;
        switch (target.name) {
            case "selectUsers":
                formValue.users = [...target.selectedOptions].map(
                    (val: { value: string }) => val.value
                );
                break;
            case "selectRole":
                formValue.role = target.value;
                break;
            default:
                break;
        }
    };

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setUsers(
            users.map((user) => {
                if (formValue.users.includes(user.id)) {
                    user.type = formValue.role;
                }
                return user;
            })
        );

        // TODO: Actually send data to server
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Manage User Roles</Card.Title>
                <CardGroup>
                    <Card>
                        <Form onSubmit={onSubmit}>
                            <Card>
                                <Card.Body>
                                    <Card.Subtitle>Select 1 or more users</Card.Subtitle>
                                    <Form.Control
                                        as="select"
                                        multiple
                                        className="my-2"
                                        onChange={onChange}
                                        name="selectUsers"
                                    >
                                        {users.map((user) => (
                                            <option value={user.id} key={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Subtitle>Select a role</Card.Subtitle>
                                    <Form.Control
                                        as="select"
                                        className="my-2"
                                        onChange={onChange}
                                        name="selectRole"
                                    >
                                        {Object.keys(UserType).map((role) => (
                                            <option value={role} key={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Button type="submit">Submit</Button>
                            </Card>
                        </Form>
                    </Card>
                    <Card>
                        <Card.Title>Your personel</Card.Title>
                        <Card.Subtitle>All the users in your database</Card.Subtitle>
                        <Card.Body>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </CardGroup>
                {/* <CardColumns><Card>Hi</Card></CardColumns> */}
            </Card.Body>
        </Card>
    );
};

export default () => {
    const { data: usersData, error: usersError, fetching: usersFetching } = usersAccessor();

    // const [users, setUsers] = React.useState<User[] | undefined>(undefined)

    if (usersFetching) return <Spinner animation="border" variant="primary" />;

    if (usersError || usersData == undefined) return <h1>Unexpected Error</h1>;

    // setUsers(usersData.allUsers)

    return <ManageUserRolesView users={usersData.allUsers} />;
    // return ManageUserRolesView({ users: users })
};

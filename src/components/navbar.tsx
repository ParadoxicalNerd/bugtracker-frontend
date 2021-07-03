import * as React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router";

// import {} from '../../dist/favicon.ico'

export default () => {

    // const history = useHistory()
    // history && console.log(history.location)

    return <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect static='top' style={{ alignItems: "center" }}>
        <Navbar.Brand href="#/" className="px-5">
            <img
                src="favicon.ico"
                width="30"
                height="30"
            />
            <span className="px-1">Bug Tracker</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
            <Nav className="mr-auto">
                <Nav.Link className="px-3" href="#/">Home</Nav.Link>
                <Nav.Link className="px-3" href="#/projects">Projects</Nav.Link>
                <Nav.Link className="px-3" href="#/userstats">User stats</Nav.Link>
                <Nav.Link className="px-3" href="#/userroles">User roles</Nav.Link>
            </Nav>
            <Button variant="primary" className="mx-2">New Ticket</Button>
        </Navbar.Collapse>
    </Navbar>
}
import * as React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default () => (
    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect static='top'>
        <Navbar.Brand href="#/" className="px-5">Bug Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
            <Nav>
                <Nav.Link className="px-3" href="#/">Home</Nav.Link>
                <Nav.Link className="px-3" href="#projects">Projects</Nav.Link>
                <Nav.Link className="px-3" href="#userstats">User stats</Nav.Link>
                <Nav.Link className="px-3" href="#userroles">User roles</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)
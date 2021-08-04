import * as React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";

// import {} from '../../dist/favicon.ico'

export default () => {
    // const history = useHistory()
    // history && console.log(history.location)

    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="sm"
            collapseOnSelect
            static="top"
            style={{ alignItems: "center" }}
        >
            <Navbar.Brand href="/home" className="px-5">
                <img src="favicon.ico" width="30" height="30" />
                <span className="px-1">Bug Tracker</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
                <Nav className="mr-auto">
                    <Nav.Link className="px-3" href="/#/home">
                        Home
                    </Nav.Link>
                    <Nav.Link className="px-3" href="/#/projects">
                        Projects
                    </Nav.Link>
                    <Nav.Link className="px-3" href="/#/userstats">
                        User stats
                    </Nav.Link>
                    <Nav.Link className="px-3" href="/#/userroles">
                        User roles
                    </Nav.Link>
                </Nav>

                <Button variant="primary" className="mx-2" href="/#/newTicket">
                    New Ticket
                </Button>

                <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() =>
                        (window.location.href = `${process.env.REACT_APP_SERVER_URL}/logout`)
                    }
                >
                    Logout
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
};

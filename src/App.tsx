import * as React from "react";
import Routes from "./router";
import Navbar from "./components/navbar";
import { Button, Card, Container, Modal } from "react-bootstrap";
import ErrorHandler from "./ErrorHandler";
import isLoggedIn from "./utils/isLoggedIn";

const App = () => {
    console.log(isLoggedIn());
    return (
        <ErrorHandler>
            <Navbar />

            {isLoggedIn() && (
                <Card>
                    <Card.Body>
                        <Container>
                            <Routes />
                        </Container>
                    </Card.Body>
                </Card>
            )}

            <Modal show={!isLoggedIn()}>
                <Modal.Header>
                    <Modal.Title>Login required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to login before you access the website</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => (location.href = `${process.env.SERVER_URL}/login`)}
                    >
                        Click to login
                    </Button>
                </Modal.Footer>
            </Modal>
        </ErrorHandler>
    );
};

export default App;

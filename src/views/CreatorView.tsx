import * as React from "react";
import { Button, ButtonGroup, Card, Col, Form, Row, ToggleButton } from "react-bootstrap";

const createType = ["Ticket", "User", "Project"];

export default () => (
    <>
        <Card>
            <Card.Body>
                <Form>
                    <Row>
                        <Col>
                            <Card.Title>
                                <h3>Create something new...</h3>
                            </Card.Title>
                        </Col>
                        <Col md="auto">
                            <Button size="sm" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup toggle>
                                {createType.map((val, id) => (
                                    <ToggleButton
                                        value={val}
                                        key={id}
                                        type="radio"
                                        variant="primary"
                                        name="createType"
                                    >
                                        {val}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    </>
);

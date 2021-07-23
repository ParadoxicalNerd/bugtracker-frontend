import * as React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

export default () => {
    const history = useHistory();
    return (
        <Button onClick={() => (location.href = "http://localhost:4000/login")}>
            Click to login!
        </Button>
    );
};

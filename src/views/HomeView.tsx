import * as React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UrqlContext from "../context/UrqlContext";
import UserContext from "../context/UserContext";
import UserStatsView from "./UserStatsView";

export default () => {
    const { context } = React.useContext(UrqlContext);

    // debugger
    return (
        <>
            <h1>Login Successful</h1>
        </>
    );
};

import * as React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UrqlContext from "../context/UrqlContext";
import UserContext from "../context/UserContext";
import getUsername from "../utils/getUsername";
import UserStatsView from "./UserStatsView";

export default () => {
    // const { context } = React.useContext(UrqlContext);

    return (
        <>
            <h1>Hello {getUsername()}</h1>
            <UserStatsView />
        </>
    );
};

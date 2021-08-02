import { parse } from "query-string";
import * as React from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import ticketAccessor from "../controllers/TicketAccessor";
import usernamesAccessor from "../controllers/UsersAccessor";
import TicketDisplayView from "./TicketDisplayView";
import TicketEditorView from "./TicketEditorView";

const TicketView = () => {
    const params = useParams<{ ticketID: string }>();
    let { search } = useLocation();
    // let match = useRouteMatch()
    // console.log(match)
    const search_parameter = parse(search, { parseNumbers: true, parseBooleans: true });

    const {
        data: ticket_data,
        error: ticket_error,
        fetching: ticket_loading,
    } = ticketAccessor(params.ticketID);
    const {
        data: usernames_data,
        error: usernames_error,
        fetching: usernames_loading,
    } = usernamesAccessor();

    // console.log(ticket_data)

    if (ticket_loading || usernames_loading)
        return <Spinner animation="border" variant="primary" />;

    if (
        ticket_error ||
        ticket_data == undefined ||
        usernames_error ||
        usernames_data == undefined
    ) {
        return <h1>Unexpected Error</h1>;
    }

    if (search_parameter.edit == undefined && search_parameter.edit != true)
        return <TicketDisplayView ticket={ticket_data.ticket} />;
    else return <TicketEditorView ticket={ticket_data.ticket} allUsers={usernames_data.allUsers} />;
};

export default TicketView;

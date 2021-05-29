import * as React from 'react'
import { parse, stringify } from 'query-string'
import { Button, Card, CardGroup, Col, Container, Form, FormControl, FormGroup, InputGroup, Row, Table } from 'react-bootstrap';
import { Ticket, ticketPriority, ticketPriorityArray, ticketStatusArray, ticketTypesArray } from "../models/Ticket";
import { useHistory, useLocation, useParams, useRouteMatch, Switch, Route } from 'react-router'
import { Spinner } from 'react-bootstrap'
import ticketAccessor from '../controller/TicketAccessor';
import usernamesAccessor from '../controller/UsernamesAccessor';
import { User } from '../models/User';
import TicketEditorView from './TicketEditorView'
import TicketDisplayView from './TicketDisplayView';

// const ticketPriorityDropdownRef = React.useRef<FormGroup | null>(null)

/*
const TicketView = () => {

    const params = useParams<{ ticketID: string }>();

    // let params = parse(search, { parseNumbers: true, parseBooleans: true })
    // let history = useHistory()

    // const [editTicket, modifyEditTicket] = React.useState(false)


    // React.useEffect(() => {
    //     if (editTicket) {
    //         parsed_object["edit"] = true
    //     } else {
    //         parsed_object
    //     }

    //     const newLocation = `#${pathname}?${stringify(parsed_object)}`

    //     console.log(pathname, '->', newLocation)

    //     window.history.replaceState({}, '', newLocation);
    // })

    // React.useEffect(() => {
    //     console.log("hooker", search)
    //     let parsed_object = parse(search)

    //     // debugger
    // })


    const { data: ticket_data, error: ticket_error, fetching: ticket_loading, } = ticketAccessor(params.ticketID)
    const { data: usernames_data, error: usernames_error, fetching: usernames_loading } = usernamesAccessor()

    // console.log(ticket_data)

    if (ticket_loading || usernames_loading) return <Spinner animation="border" variant="primary" />

    if (ticket_error || ticket_data == undefined || usernames_error || usernames_data == undefined) {
        return <h1>Unexpected Error</h1>
    }

    allUsers = usernames_data.allUsers


    // Conditional rendoring based on whether the user wants to edit the ticket or not
    const { path } = useRouteMatch()
    let { search, pathname } = useLocation()

    console.log(path, pathname, search)

    const search_parameter = parse(search, { parseNumbers: true, parseBooleans: true })
    console.log(search_parameter)

    // <Switch>
    //     <Route path={`${path}?edit="true"`} exact>
    //         <TicketEditorView ticket={ticket_data.ticket} allUsers={allUsers} />
    //     </Route>
    //     <Route path={`${path}`}>
    //         <TicketDisplayView ticket={ticket_data.ticket} />
    //     </Route>
    // </Switch>
    if (search_parameter.edit == undefined && search_parameter.edit != true) return <TicketDisplayView ticket={ticket_data.ticket} />
    else return <TicketEditorView ticket={ticket_data.ticket} allUsers={allUsers} />

}
*/

const TicketView = () => {
    const params = useParams<{ ticketID: string }>();
    let { search } = useLocation()
    // let match = useRouteMatch()
    // console.log(match)
    const search_parameter = parse(search, { parseNumbers: true, parseBooleans: true })

    const { data: ticket_data, error: ticket_error, fetching: ticket_loading, } = ticketAccessor(params.ticketID)
    const { data: usernames_data, error: usernames_error, fetching: usernames_loading } = usernamesAccessor()

    // console.log(ticket_data)

    if (ticket_loading || usernames_loading) return <Spinner animation="border" variant="primary" />

    if (ticket_error || ticket_data == undefined || usernames_error || usernames_data == undefined) {
        return <h1>Unexpected Error</h1>
    }

    if (search_parameter.edit == undefined && search_parameter.edit != true)
        return <TicketDisplayView ticket={ticket_data.ticket} />
    else return <TicketEditorView ticket={ticket_data.ticket} allUsers={usernames_data.allUsers} />
}

export default TicketView
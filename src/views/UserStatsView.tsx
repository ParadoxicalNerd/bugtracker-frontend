import * as React from 'react';
import { Card, CardGroup, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Component, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Maybe, Ticket, TicketPriority, TicketStatus, TicketTypes } from '../models';
import userStatsAccessor from '../controllers/UserStatsAccessor';
import UserContext from '../context/UserContext';
// Cannot use treeshaking for Chart. Gotta import everything. Read this:
// https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc

const TicketPriorityView = ({ tickets }: { tickets: Maybe<Maybe<Ticket>[]> | undefined }) => {

    let TICKET_INFO = {
        "UNKNOWN": {
            value: 0,
            color: 'rgb(201, 203, 207)'
        }, "LOW": {
            value: 0,
            color: 'rgb(75, 192, 192)'
        }, "MEDIUM": {
            value: 0,
            color: 'rgb(54, 162, 235)'
        }, "HIGH": {
            value: 0,
            color: 'rgb(255, 205, 86)'
        }, "CRITICAL": {
            value: 0,
            color: 'rgb(255, 99, 132)'
        }
    }

    let canvasRef = useRef<HTMLCanvasElement | null>(null)

    TICKET_INFO[TicketPriority.Unknown]

    tickets?.forEach((val) => {
        if (val && val.status != TicketStatus.Resolved) TICKET_INFO[val.priority].value++
    })

    const data = {
        labels: Object.keys(TICKET_INFO),
        datasets: [{
            label: 'Assigned Bugs',
            data: Object.values(TICKET_INFO).map(ele => ele.value),
            backgroundColor: Object.values(TICKET_INFO).map(ele => ele.color),
        }]
    };

    const options = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                // position: "right"
            },
            // title: {
            //     display: true,
            //     text: "Tickets By Priority",
            //     padding: {
            //         top: 20
            //     },
            //     font: {
            //         size: 30
            //     }
            // }
        }
    }

    useEffect(() => {
        let chart: any;
        if (canvasRef.current) {
            let canvasChart = canvasRef.current.getContext("2d")

            // Chart.defaults.global.legend.display = false;

            if (canvasChart) {
                chart = new Chart(canvasChart, {
                    type: "doughnut",
                    data: data,
                    options: options
                })
            }
        }

        return () => {
            // Cleanup function
            chart.destroy();
        }
    })

    return (
        <Card>
            <Card.Body>
                <Card.Title><h3>Tickets by priority</h3></Card.Title>
                <Container >
                    <div style={{ width: "75%", margin: "0 auto" }}>
                        {/* Centering everything */}
                        <canvas ref={canvasRef} />
                    </div>
                </Container>
            </Card.Body>
        </Card>
    )
}

const TicketTypeView = ({ tickets }: { tickets: Maybe<Maybe<Ticket>[]> | undefined }) => {

    let TICKET_INFO = {
        "BUG": {
            value: 0,
            color: 'rgb(201, 203, 207)'
        }, "FEATURE": {
            value: 0,
            color: 'rgb(75, 192, 192)'
        }, "DOCS": {
            value: 0,
            color: 'rgb(54, 162, 235)'
        }
    }

    let canvasRef = useRef<HTMLCanvasElement | null>(null)

    tickets?.forEach((val) => {
        if (val && val.status != TicketStatus.Resolved) TICKET_INFO[val.type].value++
        // Ensures we only count open tickets
    })

    const data = {
        labels: Object.keys(TICKET_INFO),
        datasets: [{
            label: 'Assigned Bugs',
            data: Object.values(TICKET_INFO).map(ele => ele.value),
            backgroundColor: Object.values(TICKET_INFO).map(ele => ele.color),
        }]
    };

    const options = {
        // animation: {
        //     duration: 0
        // },
        plugins: {
            legend: {
                // position: 'right'
                display: false
            },
            // title: {
            //     display: true,
            //     text: "Tickets By Types",
            //     padding: {
            //         top: 20
            //     },
            //     font: {
            //         size: 30
            //     }
            // }
        },
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }

    useEffect(() => {
        let chart: any;
        if (canvasRef.current) {
            let canvasChart = canvasRef.current.getContext("2d")

            // Chart.defaults.global.legend.display = false;

            if (canvasChart) {
                chart = new Chart(canvasChart, {
                    type: "bar",
                    data: data,
                    options: options
                })
            }
        }
        return () => {
            // Cleanup function
            chart.destroy();
        }
    })

    return (
        <Card>
            <Card.Body style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <Card.Title><h3>Tickets by types</h3></Card.Title>
                <Container >
                    <canvas ref={canvasRef} />
                </Container>
                <div>{/* Blank container to center everything */}</div>
            </Card.Body>
        </Card >
    )
}

export default () => {

    const { userID } = React.useContext(UserContext)

    const { data, error, fetching } = userStatsAccessor(userID)

    // console.log(data)

    if (fetching) return <Spinner animation="border" variant="primary" />

    if (error || data == undefined) {
        console.log(error)
        console.log(data)
        return <h1>Unexpected Error</h1>
    }

    return (

        <CardGroup>
            <TicketPriorityView tickets={data.user.ticketsAuthored} />
            <TicketTypeView tickets={data.user.ticketsAuthored} />
        </CardGroup>

    )
}
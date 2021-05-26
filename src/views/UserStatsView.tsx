import * as React from 'react';
import { Spinner } from 'react-bootstrap'
import { Component, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Ticket, ticketPriority } from '../models/Ticket';
import userStatsAccerssor from '../controller/UserStatsAccessor';
// Cannot use treeshaking for Chart. Gotta import everything. Read this:
// https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc

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

const userStatsView = (tickets: [Ticket]) => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null)

    tickets.forEach((val) => {
        TICKET_INFO[ticketPriority[val.priority]].value++
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
                position: 'right'
            },
            title: {
                display: true,
                text: "Tickets By Priority",
                padding: {
                    top: 20
                },
                font: {
                    size: 30
                }
            }
        }
    }

    useEffect(() => {
        if (canvasRef.current) {
            let canvasChart = canvasRef.current.getContext("2d")

            // Chart.defaults.global.legend.display = false;

            if (canvasChart) {
                new Chart(canvasChart, {
                    type: "doughnut",
                    data: data,
                    options: options
                })
            }
        }
    })

    return (
        <div style={{ width: "500px" }}> {
            // TODO: Make responsive
        }
            <canvas ref={canvasRef} style={{ border: "1px black solid" }} />
        </div>
    )
}

export default (props: { userID: number }) => {
    const { data, error, loading } = userStatsAccerssor(props.userID)

    // console.log(data)

    if (loading) return <Spinner animation="border" variant="primary" />

    return (
        <>
            {(error || data == undefined) ? <h1>Unexpected Error</h1> :
                data && userStatsView(data.user.tickets)
            }
        </>
    )
}
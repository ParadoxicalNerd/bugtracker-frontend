import * as React from 'react';
import { Component, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Ticket, ticketPriority } from '../models/Ticket';
// Cannot use treeshaking for Chart. Gotta import everything. Read this:
// https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc

let tickets = {
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

export default (props: { tickets: [Ticket] }) => {
    let canvasRef = useRef<HTMLCanvasElement | null>(null)

    props.tickets.forEach((val) => {
        tickets[ticketPriority[val.priority]].value++
    })

    const data = {
        labels: Object.keys(tickets),
        datasets: [{
            label: 'Assigned Bugs',
            data: Object.values(tickets).map(ele => ele.value),
            backgroundColor: Object.values(tickets).map(ele => ele.color),
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
                display:true,
                text: "Tickets Assigned",
                padding: {
                    top:20
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
import * as React from "react";
import * as ReactDOM from "react-dom";

import { createClient, Provider, defaultExchanges } from "urql";
import { devtoolsExchange } from "@urql/devtools";

import App from "./App";
import "./styles.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/navbar";

fetch("/hi").then((res) => console.log(res));

const client = createClient({
    url: `/graphql`, //TODO: Check this fucker out
    exchanges: [devtoolsExchange, ...defaultExchanges],
});

let mountNode = document.getElementById("app");

ReactDOM.render(
    <Provider value={client}>
        {/* INFO: Routing issue https://ui.dev/react-router-cannot-get-url-refresh/ */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    mountNode
);

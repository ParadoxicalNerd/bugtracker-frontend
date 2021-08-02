import { devtoolsExchange } from "@urql/devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createClient, defaultExchanges, Provider } from "urql";
import App from "./App";

const client = createClient({
    url: `${process.env.REACT_APP_SERVER_URL}/graphql`,
    exchanges: [devtoolsExchange, ...defaultExchanges],
    fetchOptions: {
        credentials: "include",
    },
});

let mountNode = document.getElementById("root");

console.log(process.env.REACT_APP_SERVER_URL);

ReactDOM.render(
    <Provider value={client}>
        {/* INFO: Routing issue https://ui.dev/react-router-cannot-get-url-refresh/ */}
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    mountNode
);

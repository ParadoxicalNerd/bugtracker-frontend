import * as React from 'react';
import * as ReactDOM from "react-dom";

import { createClient, Provider, defaultExchanges } from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import App from './App';
import "./styles.scss";

import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';

import Navbar from './components/navbar'

const client = createClient({
    url: `http://localhost:4000/graphql`, //TODO: Check this fucker out
    exchanges: [devtoolsExchange, ...defaultExchanges],
})

let mountNode = document.getElementById("app");

ReactDOM.render(
    <Provider value={client}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    mountNode
);

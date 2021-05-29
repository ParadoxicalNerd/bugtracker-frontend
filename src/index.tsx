import { createClient, Provider } from 'urql';
import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.scss";

import 'bootstrap/dist/css/bootstrap.min.css';

const client = createClient({
    url: `http://localhost:9002/graphql`
})

let mountNode = document.getElementById("app");

ReactDOM.render(
    <Provider value={client}>
        <App />
    </Provider>,
    mountNode
);

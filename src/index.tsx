import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.scss";

import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
    uri: `http://localhost:9002/graphql`,
    cache: new InMemoryCache()
})

let mountNode = document.getElementById("app");

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    mountNode
);

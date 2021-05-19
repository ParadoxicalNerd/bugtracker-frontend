import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.scss";

const client = new ApolloClient({
    uri: `https://mockend.com/ParadoxicalNerd/bugtracker-fronend/graphql`,
    cache: new InMemoryCache()
})

let mountNode = document.getElementById("app");

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    mountNode
);

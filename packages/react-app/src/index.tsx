import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import App from './App';
import { theme } from './components/theme/main-theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/theme/global-style';

// This is the official Compound subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root'),
);

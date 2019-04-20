import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {ApolloProvider} from 'react-apollo';
import client from './apollo';
import GlobalStyle from "./globalStyles"; 

ReactDOM.render(<ApolloProvider client={client}><GlobalStyle/><App /></ApolloProvider>, document.getElementById('root'));

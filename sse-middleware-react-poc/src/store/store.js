import { createStore, applyMiddleware, compose } from 'redux'

import sseMiddleware from "./sse/sseMiddleware";

import MessagesReducer from './messages/MessagesReducer'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(MessagesReducer, composeEnhancers(
        applyMiddleware(sseMiddleware)
    )
);
/* eslint-enable */

const redux = { store };

export default redux;
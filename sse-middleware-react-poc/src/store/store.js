import { createStore, applyMiddleware } from 'redux'

import sseMiddleware from "./sse/sseMiddleware";

import MessagesReducer from './messages/MessagesReducer'


const store = createStore(MessagesReducer, applyMiddleware(sseMiddleware));
const redux = { store };

export default redux;
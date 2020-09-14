import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createEpicMiddleware } from 'redux-observable'
import { combineEpics } from 'redux-observable'
import { pingEpic } from '../action'
import { user, counter, ping } from './reducer'

const epicMiddleware = createEpicMiddleware()

const rootReducer = combineReducers({
  user,
  counter,
  ping
});

export const rootEpic = combineEpics(pingEpic)

epicMiddleware.run(rootEpic)

const store = createStore(rootReducer, applyMiddleware(thunk, epicMiddleware));

export default store;

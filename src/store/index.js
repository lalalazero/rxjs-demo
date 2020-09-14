import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
import { combineEpics } from "redux-observable";
import { pingEpic, fetchUserEpic } from "../action";
import { user, counter, ping } from "./reducer";

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user,
  counter,
  ping,
});

export const rootEpic = combineEpics(pingEpic, fetchUserEpic);



const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;

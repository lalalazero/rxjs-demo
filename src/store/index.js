import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ADD_COUNT, MINUS_COUNT, QUERY_COUNT_END } from "../action/index";

const user = (initState = {}, { type, payload }) => {
  switch (type) {
    default:
      return initState;
  }
};

const counter = (initState = 0, { type, payload }) => {
  switch (type) {
    case ADD_COUNT:
      return initState + payload;
    case MINUS_COUNT:
      return initState - payload;
    case QUERY_COUNT_END:
      return initState + payload;
    default:
      return initState;
  }
};

const rootReducer = combineReducers({
  user,
  counter,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

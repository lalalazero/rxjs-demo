import { ADD_COUNT, MINUS_COUNT, QUERY_COUNT_END } from "../action/index";
import { PING, PANG, FETCH_USER, FETCH_USER_FULLFILLED  } from "../action";

export const ping = (initState = { isPing: false }, action) => {
  console.log("ping reducers, type = ", action.type);
  switch (action.type) {
    case PING:
      return { isPing: true };
    case PANG:
      return { isPing: false };
    default:
      return initState;
  }
};

export const user = (initState = {}, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
        return { ...initState, tips: 'loading user...'}
    case FETCH_USER_FULLFILLED:
        return { ...initState, tips: 'loading done!', ...payload }
    default:
      return initState;
  }
};

export const counter = (initState = 0, { type, payload }) => {
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

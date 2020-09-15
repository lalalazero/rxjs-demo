import { counterService } from "../service";
import { ofType } from "redux-observable";
import { filter, map, delay } from "rxjs/operators";

export const ADD_COUNT = "ADD_COUNT";
export const MINUS_COUNT = "MINUS_COUNT";
export const QUERY_COUNT_END = "QUERY_COUNT_END";

export const addCount = (payload) => {
  return {
    type: ADD_COUNT,
    payload,
  };
};

export const minusCount = (payload) => {
  return {
    type: MINUS_COUNT,
    payload,
  };
};

export const addCountAsync = (payload) => async (
  dispatch,
  getState,
  extraArgs
) => {
  const result = await counterService.add(payload);
  dispatch({
    type: QUERY_COUNT_END,
    payload: result ? result.value : 0,
  });
};

export const INCREMENT = "INCREMENT";
export const INCREMENT_IF_ODD = "INCREMENT_IF_ODD";
export const increment = () => ({ type: INCREMENT });
export const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

export const incrementIfOddEpic = (action$, state$) => {
  console.log("state$: ", state$);
  return action$.pipe(
    ofType(INCREMENT_IF_ODD),
    filter(() => state$.value.counter % 2 === 1),
    delay(1000),
    map(() => increment())
  );
};

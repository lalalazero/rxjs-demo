import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { mergeMap, map, every } from "rxjs/operators";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_FULLFILLED = "FETCH_USER_FULLFILLED";

export const fetchUser = (username) => {
  return { type: FETCH_USER, payload: username };
};

export const fetchUserFullfilled = (payload) => ({
  type: FETCH_USER_FULLFILLED,
  payload,
});

export const fetchUserEpic = (action$) => {
  console.log("fetch user epic..", action$);
  return action$.pipe(
    ofType(FETCH_USER),
    mergeMap((action) => {
      return ajax
        .getJSON(`http://api.github.com/users/${action.payload}`)
        .pipe(map((response) => fetchUserFullfilled(response)));
    })
  );
};

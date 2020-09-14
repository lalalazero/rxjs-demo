
import { mapTo, every, delay } from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const PING = 'PING'
export const PANG = 'PANG'

export const pingEpic = action$ => { 
    console.log('enter pinEpic..', action$)
    return action$.pipe(
    ofType(PING),
    every(action => console.log('receive ping action - ', action)),
    delay(1000),
    mapTo({ type: PANG})
)}

import { mapTo,  delay } from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const PING = 'PING'
export const PANG = 'PANG'

export const pingEpic = action$ => { 
    console.log('enter pinEpic..', action$)
    return action$.pipe(
    ofType(PING),
    delay(1000),
    mapTo({ type: PANG})
)}
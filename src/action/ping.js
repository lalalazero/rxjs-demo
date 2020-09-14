
import { filter, mapTo } from 'rxjs/operators'

export const PING = 'PING'
export const PANG = 'PANG'

export const pingEpic = action$ => action$.pipe(
    filter(action => action.type === 'PING'),
    mapTo({ type: 'PONG'})
)
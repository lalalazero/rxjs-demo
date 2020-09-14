import { counterService } from '../service'

export const ADD_COUNT = 'ADD_COUNT'
export const MINUS_COUNT = 'MINUS_COUNT'
export const QUERY_COUNT_END = 'QUERY_COUNT_END'


export const addCount = (payload) => {
    return {
        type: ADD_COUNT,
        payload
    }
}

export const minusCount = (payload) => {
    return {
        type: MINUS_COUNT,
        payload
    }
}

export const addCountAsync = payload => async (dispatch, getState, extraArgs)  => {
    const result = await counterService.add(payload)
    dispatch({
        type: QUERY_COUNT_END,
        payload: result ? result.value : 0
    })
}
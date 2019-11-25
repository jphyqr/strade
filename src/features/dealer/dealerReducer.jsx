import { createReducer } from "../../app/common/util/reducerUtils";
import {SET_DEALER} from './dealerConstants'

const initialState = {}

export const setDealer = (state,payload) => {
    console.log('setDealer', payload)
    return payload.updatedDealer
  }



export default createReducer(initialState, {
    [SET_DEALER]: setDealer
})
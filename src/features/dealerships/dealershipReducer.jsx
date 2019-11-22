import { createReducer } from "../../app/common/util/reducerUtils";
import {SELECT_DEALERSHIP} from './dealershipConstants'

const initialState = {}

export const selectDealership = (state,payload) => {
    console.log('setDealership', payload)
    return payload.dealership
  }



export default createReducer(initialState, {
    [SELECT_DEALERSHIP]: selectDealership
})
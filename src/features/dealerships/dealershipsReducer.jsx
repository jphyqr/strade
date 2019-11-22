import { createReducer } from "../../app/common/util/reducerUtils";
import {FETCH_DEALERSHIPS, UPDATE_DEALERSHIP} from './dealershipConstants'

const initialState = [];

export const fetchDealerships = (state,payload) => {
    console.log('fetchDealerships', payload)
    return payload.dealerships
  }

export const updateDealership = (state, payload) => {
   console.log("updatedDealership", payload )
  return[...state.filter(dealership=>dealership.id!==payload.id),
    Object.assign({}, payload.updatedDealership)]
}


// export const updateEvent = (state, payload) => {
//   return [
//     ...state.filter(event => event.id !== payload.event.id),
//     Object.assign({}, payload.event)
//   ]
// }

export default createReducer(initialState, {
    [FETCH_DEALERSHIPS]: fetchDealerships,
    [UPDATE_DEALERSHIP]: updateDealership
})
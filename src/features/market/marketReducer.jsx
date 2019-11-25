import { createReducer } from "../../app/common/util/reducerUtils";
import {SET_MARKET, UPDATE_MARKET} from './marketConstants'


const initialState = {}

export const setMarket = (state, payload) => {
  return payload.updatedMarket
}


// export const fetchDealerships = (state,payload) => {

//     return payload.dealerships
//   }

// export const updateDealership = (state, payload) => {
  
//   return[...state.filter(dealership=>dealership.id!==payload.id),
//     Object.assign({}, payload.updatedDealership)]
// }





export default createReducer(initialState, {
    [SET_MARKET]:setMarket
})


// export default createReducer(initialState, {
//     [FETCH_DEALERSHIPS]: fetchDealerships,
//     [UPDATE_DEALERSHIP]: updateDealership
// })
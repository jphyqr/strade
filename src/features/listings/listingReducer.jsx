import { createReducer } from "../../app/common/util/reducerUtils";
import { SELECT_LISTING, UPDATE_LISTING} from './listingConstants'

const initialState = [];

export const selectListing = (state,payload) => {
    console.log('fetchListing', payload)
    return payload.updatedListing
  }



  export const updateListing = (state, payload) => {
  
    return[...state.filter(listing=>listing.id!==payload.id),
      Object.assign({}, payload.updatedListing)]
  }
  
export default createReducer(initialState, {
    [SELECT_LISTING]: selectListing,
    [UPDATE_LISTING]: updateListing})
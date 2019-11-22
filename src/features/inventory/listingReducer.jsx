import { createReducer } from "../../app/common/util/reducerUtils";
import { SELECT_LISTING} from './listingConstants'

const initialState = [];

export const selectListing = (state,payload) => {
    console.log('fetchListing', payload)
    return payload.listing
  }




export default createReducer(initialState, {
    [SELECT_LISTING]: selectListing
})
import { combineReducers } from "../../../../Library/Caches/typescript/3.6/node_modules/redux";
import testReducer from "../../features/testarea/testReducer";
import { firebaseReducer,  } from "react-redux-firebase";
import {firestoreReducer} from 'redux-firestore'
import dealershipReducer from "../../features/dealerships/dealershipReducer";
import dealershipsReducer from "../../features/dealerships/dealershipsReducer";
import listingReducer from "../../features/inventory/listingReducer";

const rootReducer = combineReducers({

    test:testReducer,
    firebase: firebaseReducer,
    forestore: firestoreReducer,
    dealerships: dealershipsReducer,
    dealership:dealershipReducer,
    listing:listingReducer
})

export default rootReducer
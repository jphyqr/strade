import { combineReducers } from "../../../../Library/Caches/typescript/3.6/node_modules/redux";
import testReducer from "../../features/testarea/testReducer";
import { firebaseReducer,  } from "react-redux-firebase";
import {firestoreReducer} from 'redux-firestore'
import dealerReducer from "../../features/dealer/dealerReducer";
import listingReducer from "../../features/listings/listingReducer";
import marketReducer from "../../features/market/marketReducer";

const rootReducer = combineReducers({

    test:testReducer,
    firebase: firebaseReducer,
    forestore: firestoreReducer,
    dealer:dealerReducer,
    listing:listingReducer,
    market:marketReducer
})

export default rootReducer
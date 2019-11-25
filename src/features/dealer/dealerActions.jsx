import axios from "axios";
import firebase from '../../app/config/firebase'
import {  SET_DEALER } from "./dealerConstants";
const MARKETCHECK_ROOT_URL = "https://marketcheck-prod.apigee.net/v1/search?";
const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'



export const selectDealer = (updatedDealer) =>{
    return async (dispatch, getState)=>{
            console.log('selectDealership action clicked', updatedDealer)
     
        dispatch({
            type: SET_DEALER,
            payload: {updatedDealer}
        })

    }

}








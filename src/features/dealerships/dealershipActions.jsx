import axios from "axios";
import firebase from '../../app/config/firebase'
import { FETCH_DEALERSHIPS, SELECT_DEALERSHIP } from "./dealershipConstants";
const MARKETCHECK_ROOT_URL = "https://marketcheck-prod.apigee.net/v1/search?";
const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'



export const selectDealership = (dealership) =>{
    return async (dispatch, getState)=>{
            console.log('selectDealership action clicked', dealership)
     
        dispatch({
            type: SELECT_DEALERSHIP,
            payload: {dealership}
        })

    }

}


export const getAllDealershipsForDashboardByArea = (LAT_LNG, radius)=>   {
    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    //const jobsRef = firestore.collection("jobs");

    const REQUEST_URL = `${GCF_ROOT_URL}/getAllDealerships`
    try {
 
  
  


        let response = await axios.post(
            REQUEST_URL,
            { LAT_LNG:LAT_LNG, radius:radius },
            {
              headers: {
                "content-type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
          console.log('getAllDealershipForDashboard response', response)

          const dealerships = response.data.data

          dispatch({
            type: FETCH_DEALERSHIPS,
            payload: {dealerships}
        })







    } catch (error) {
      console.log(error);
 
    }
  }
  }
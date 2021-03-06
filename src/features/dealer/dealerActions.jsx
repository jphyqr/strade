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



export const getModelFacetForDealer = (country, dealer, owned, used) =>{
    return async (dispatch, getState)=>{
            console.log('selectDealership action clicked', dealer)
            const REQUEST_URL = `${GCF_ROOT_URL}/getModelFacetForDealer` 
let updatedDealer = dealer
let updatedFacets = updatedDealer.facets || {}
let response = await axios.post(
    REQUEST_URL,
    {country: country, dealer:updatedDealer, owned:owned, used:used},
    {
      headers: {
        "content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );

  console.log(' Model Facet response', response.data)
       
  const { data : facetData} = response.data  || {}
 const {facets} = facetData || {}
 const {model} = facets || []
 updatedFacets.model = model
 updatedDealer.facets = updatedFacets
        dispatch({
            type: SET_DEALER,
            payload: {updatedDealer}
        })

    }

}







export const getDealerInfo = (id) =>{
    return async (dispatch, getState)=>{
            console.log('getDealerInfo', id)
            const REQUEST_URL = `${GCF_ROOT_URL}/getDealerInfo` 

let response = await axios.post(
    REQUEST_URL,
    {id: id },
    {
      headers: {
        "content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );

  console.log(' getDealerInfo', response.data)
       
  const { data : updatedDealer} = response.data  || {}

        dispatch({
            type: SET_DEALER,
            payload: {updatedDealer}
        })

    }

}



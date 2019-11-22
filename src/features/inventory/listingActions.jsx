import axios from "axios";
import firebase from '../../app/config/firebase'
import { SELECT_LISTING } from "./listingConstants";
import {FETCH_DEALERSHIPS, UPDATE_DEALERSHIP} from '../dealerships/dealershipConstants'
const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'



export const selectListing = (listing) =>{
    return async (dispatch, getState)=>{
            console.log('SELECT LISTING REACHED', listing)
     
        dispatch({
            type: SELECT_LISTING,
            payload: {listing}
        })

    }

}






export const getPhotosForListing = (dealership, item)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

//const {latitude, longitude} = dealership || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getPhotosForListing`
  try {





      let response = await axios.post(
          REQUEST_URL,
          { id:item.id},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        console.log('getPhotosForListing response', response.data)

         const { photo_url} = response.data.data  || {}

         const {photo_links} = response.data || []
  
         const {listings} = dealership || []

         let updatedListings = listings.map(a => {
          var returnValue = {...a};
        
          if (a.id == item.id) {
    
            returnValue.photo_url = photo_url;
            returnValue.photo_links = photo_links
          }
        
          return returnValue
        })


        let updatedDealership = dealership
        updatedDealership.listings = updatedListings


         const {id} = dealership
          dispatch({
            type: UPDATE_DEALERSHIP,
            payload: {id, updatedDealership}
        })



  } catch (error) {
    console.log(error);

  }
}
}










export const getAveragePriceForYMM = (dealership, item)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {latitude, longitude} = dealership || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getAveragePriceForYMM`
  try {





      let response = await axios.post(
          REQUEST_URL,
          { inventory:item, lat:latitude, lng:longitude, radius:250},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        console.log('getAllInventoryForDealership response', response)

        const {data :d1} = response || {}
        const {data} = d1 || {}
          const {stats} = data || {}
  //const {stats} = s1 || {}
  //console.log({stats})
          const {price : priceStats} = stats || {}
          const {mean, median, cont, max, min} = priceStats || {}
   
          console.log({priceStats})
  
         const {listings} = dealership || []

         let updatedListings = listings.map(a => {
          var returnValue = {...a};
        
          if (a.id == item.id) {
           // console.log('updated mean price for', a.id)
            returnValue.meanPriceInLocal = mean;
            returnValue.medianPriceInLocal = median
          }
        
          return returnValue
        })


         console.log({updatedListings})
        let updatedDealership = dealership
        updatedDealership.listings = updatedListings

       //  console.log('UPDATE_DEALERSHIP dealership', dealership)
       //  console.log('UPDATEDEALERSHIP item', item)
         const {id} = dealership
          dispatch({
            type: UPDATE_DEALERSHIP,
            payload: {id, updatedDealership}
        })



  } catch (error) {
    console.log(error);

  }
}
}



export const getAllInventoryForADealership = (dealership, dealerships)=>   {
    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    //const jobsRef = firestore.collection("jobs");
const {id} = dealership ||{}
    const REQUEST_URL = `${GCF_ROOT_URL}/getInventoryForDealership`
    try {
 
  
  


        let response = await axios.post(
            REQUEST_URL,
            { dealershipId:dealership.id },
            {
              headers: {
                "content-type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
          console.log('getAllInventoryForDealership response', response)


       // let updatedDealership = dealership
        const {data} = response || {}
        const {listingsCountMakeFacet} = data || {}
        const {num_found, facets} = listingsCountMakeFacet || {}
        const {listings} = listingsCountMakeFacet || []
    //    updatedDealership.listings = listings

     //     const inventory = response.data.listings
//console.log({inventory})

            for(let i=0; i<dealerships.length;i++){
              console.log({dealership})
              if(dealerships[i].id==dealership.id)
              {
                console.log('match on id', dealership.id)
                
                let updatedDealership =dealerships[i]
                updatedDealership.listings = listings
                updatedDealership.num_found = num_found
                updatedDealership.facets = facets
                dispatch({
                  type: UPDATE_DEALERSHIP,
                  payload: {id, updatedDealership}
              })
              }
            }

          console.log("getState test", getState)






    } catch (error) {
      console.log(error);
 
    }
  }
  }

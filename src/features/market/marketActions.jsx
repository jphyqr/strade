import axios from "axios";
import firebase from '../../app/config/firebase'
import { SET_MARKET } from "./marketConstants";

const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'



export const setMarketLocation = (market, lat, lng, radius, location, country) => {
return async (dispatch, getState)=>{
  try{
  console.log('setMarketLocation', market)
  console.log('setMarketLocation', lat)
   let updatedMarket = market || {}

   updatedMarket.lat = lat
   updatedMarket.lng = lng
   updatedMarket.radius = radius
   updatedMarket.location = location
   updatedMarket.country = country



   dispatch({
    type: SET_MARKET,
    payload: {updatedMarket}
})

  } catch (error){
    console.log(error)
  }
}

}


export const getAllDealershipsForMarket = (country, market)=>   {

  //console.log('getAllDealershipsForMarket country', country)
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();
  //const jobsRef = firestore.collection("jobs");

  const {lat, lng, radius} = market || {}

  let updatedDealerships = market.dealerships || []
  let updatedMarket = market || {}
  const GET_DEALERSHIPS_URL = `${GCF_ROOT_URL}/getAllDealerships`
  const GET_INVENTORY_COUNTS_FOR_DEALERS_URL = `${GCF_ROOT_URL}/getListingCountsForMarket`
  try {





      let response = await axios.post(
          GET_DEALERSHIPS_URL,
          {country: country, lat:lat, lng:lng, radius:radius },
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        //console.log('getAllDealershipForDashboard response', response)

        const dealerships = response.data.data
        updatedDealerships = dealerships

        let countResponse = await axios.post(
          GET_INVENTORY_COUNTS_FOR_DEALERS_URL,
          { lat:lat, lng:lng, radius:radius, country:country },
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
        
  
         //console.log('marketActions/getAllDealerships/GetInventoryCounts Response.data', countResponse.data)
           
          const {data : d1} = countResponse || {}
        
            const {data} = d1 || {}
      
         const {num_found : totalListingsInMarket, facets} = data || {}
   
           const {dealer_id} = facets || []
     

           for(var i=0; i<dealer_id.length; i++){
             //console.log('in loop', i)
            let top20Dealership = dealer_id[i]
            //console.log({top20Dealership})
            //console.log({dealerships})
            var foundIndex = dealerships.findIndex(x => x.id == top20Dealership.item);
            if(foundIndex>-1){
              let updateDealership = dealerships[foundIndex]
              updateDealership.inventoryCount = top20Dealership.count
              if(updateDealership){
              
                updatedDealerships[foundIndex] = updateDealership
                //console.log({updatedDealerships})

               
             
       
            }
            }
      
          //  console.log({updateDealership}&&foundIndex>-1)
         
           // dealerships[foundIndex].inventoryCount = top20Dealership.count
           }


            

           updatedMarket.dealerships = updatedDealerships

        dispatch({
          type: SET_MARKET,
          payload: {updatedMarket}
      })







  } catch (error) {
    console.log(error);

  }
}
}



export const getMarketYMMTFacet = (market)=>   {
    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    //const jobsRef = firestore.collection("jobs");
    const {lat, lng, radius} = market || {}
    const REQUEST_URL = `${GCF_ROOT_URL}/getMarketYMMTFacet`
    try {
  
  
  
  
  
        let response = await axios.post(
            REQUEST_URL,
            { lat:lat, lng:lng, radius:radius },
            {
              headers: {
                "content-type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
          console.log('getMarketYMMTFacet response', response)
  
    //      const dealerships = response.data.data
  
        //   dispatch({
        //     type: FETCH_DEALERSHIPS,
        //     payload: {dealerships}
        // })
  
        const facets = response.data.data.facets

        let updatedMarket = market
        updatedMarket.facets = facets
  
        dispatch({
          type: SET_MARKET,
          payload: {updatedMarket}
      })

  
  
  
    } catch (error) {
      console.log(error);
  
    }
  }
  }
  
  
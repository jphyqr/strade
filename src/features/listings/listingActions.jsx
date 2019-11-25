import axios from "axios";
import firebase from '../../app/config/firebase'
import { SELECT_LISTING, UPDATE_LISTING } from "./listingConstants";
import {SET_DEALER} from '../dealer/dealerConstants'
import {SET_MARKET} from '../market/marketConstants'


const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'



export const getSimilarInventory = (dealer, listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {latitude, longitude} = dealer || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getSimilarInventory`
  try {

console.log('getSimilar')



      let response = await axios.post(
          REQUEST_URL,
          { listing:listing, lat:latitude, lng:longitude, radius:250},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
 
let updatedListing = listing
        const {data :d1} = response || {}
        const {data} = d1 || {}
        console.log('getSimilar response.data', data)
          const {listings : similarListings, num_found} = data || {}

       updatedListing.similarListings = similarListings

       let updateddealer = dealer
const {id} = listing || {}
    
          dispatch({
            type: UPDATE_LISTING,
            payload: {id, updatedListing}
        })



  } catch (error) {
    console.log(error);

  }
}
}














export const selectListing = (updatedListing) =>{
    return async (dispatch, getState)=>{
            console.log('SELECT LISTING REACHED', updatedListing)
     
        dispatch({
            type: SELECT_LISTING,
            payload: {updatedListing}
        })

    }

}




export const getTradeSmartForListing = (listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

  const REQUEST_URL = `${GCF_ROOT_URL}/getTradeSmartForListing`
  try {


      let updatedListing = listing

      let response = await axios.post(
          REQUEST_URL,
          { id:listing.id},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
           console.log('TRADE_SMART response.data', response.data)
        //  const { photo_url} = response.data.data  || {}

        //  const {photo_links} = response.data || []
  
       

       
        // updatedListing.photo_url = photo_url
        //  updatedListing.photo_links = photo_links
        //   console.log({updatedListing})

         
        //   dispatch({
        //     type: SELECT_LISTING,
        //     payload: {updatedListing}
        // })



  } catch (error) {
    console.log(error);

  }
}
}



//called when slider loads inventory, called for entire inventory of a dealership
export const getPhotosForListing = (dealer, item)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

  const REQUEST_URL = `${GCF_ROOT_URL}/getPhotosForListing`
  try {


      let updatedListing = item

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
           console.log('response.data', response.data)
         const { data : mds_data} = response.data  || {}

         const {photo_links, photo_url} = response.data || []
  
       

       
        updatedListing.photo_url = photo_url
         updatedListing.photo_links = photo_links
          console.log({updatedListing})

         
          dispatch({
            type: SELECT_LISTING,
            payload: {updatedListing}
        })



  } catch (error) {
    console.log(error);

  }
}
}



export const getMDSForListing = (market, listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

  const REQUEST_URL = `${GCF_ROOT_URL}/getMDSForListing`
  try {


      let updatedListing = listing
      const {lat, lng, radius} = market || {}
      let response = await axios.post(
          REQUEST_URL,
          { listing:listing , lat:lat, lng:lng, radius:radius},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
           console.log(' MDS response.data', response.data)
       
           const { data : mds_data} = response.data  || {}

       
         updatedListing.mds_data = mds_data
        //  updatedListing.photo_links = photo_links
        //   console.log({updatedListing})

         
          dispatch({
            type: SELECT_LISTING,
            payload: {updatedListing}
        })



  } catch (error) {
    console.log(error);

  }
}
}











export const getAveragePriceForYMM = (dealer, inventoryItem)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {latitude, longitude} = dealer || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getAveragePriceForYMM`
  try {





      let response = await axios.post(
          REQUEST_URL,
          { inventory:inventoryItem, lat:latitude, lng:longitude, radius:250},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
 

        const {data :d1} = response || {}
        const {data} = d1 || {}
        console.log({data})
          const {stats} = data || {}
  //const {stats} = s1 || {}
  //console.log({stats})
          const {price : priceStats} = stats || {}
          const {mean, median, cont, max, min} = priceStats || {}
   
        
         
         const {listings,} = dealer || []
           let updatedMean = dealer.means || []
           let inventoryTotal= dealer.inventoryTotal || 0
           let marketAverageTotal = dealer.marketAverageTotal || 0
           let marketPosition = dealer.marketPosition || 0
           let updatedMedians = dealer.medians || []
            let updatedListings = listings.map(a => {
          var returnValue = {...a};
        
          if (inventoryItem.price>0&&a.id == inventoryItem.id) {
           

            
            returnValue.meanPriceInLocal = mean;
            returnValue.medianPriceInLocal = median
         
            
            updatedMean.push(mean)
            console.log({inventoryItem})
            inventoryTotal = inventoryTotal+inventoryItem.price
            marketAverageTotal = marketAverageTotal+mean
         

              console.log({inventoryTotal})
              console.log({marketAverageTotal})
            updatedMedians.push(median)
         
  
          }
        
          return returnValue
        })


        let updatedDealer = dealer
    
        updatedDealer.listings = updatedListings
        updatedDealer.means = updatedMean;
        updatedDealer.medians = updatedMedians;
        updatedDealer.inventoryTotal = inventoryTotal
        updatedDealer.marketAverageTotal = marketAverageTotal
       

        marketPosition =  (inventoryTotal-marketAverageTotal)/marketAverageTotal*100
        updatedDealer.marketPosition = marketPosition
        const average = list => list.reduce((prev, curr) => prev + curr) / list.length;

      // 15
      

          updatedDealer.mean =  average(updatedMean) 
          updatedDealer.median =average(updatedMedians)



    
          dispatch({
            type: SET_DEALER,
            payload: {updatedDealer}
        })



  } catch (error) {
    console.log(error);

  }
}
}


//currently getting at map pin load, should only get called when dealership clicked
export const getAllInventoryForADealer = (market, dealer)=>   {
    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    //const jobsRef = firestore.collection("jobs");

    const REQUEST_URL = `${GCF_ROOT_URL}/getInventoryForDealership`
    try {
 
  
     let updatedMarket = market;
     let updatedDealer = dealer;
      const {dealerships} = updatedMarket || []
     let updatedDealerships = dealerships || []
        let response = await axios.post(
            REQUEST_URL,
            { dealer:dealer },
            {
              headers: {
                "content-type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
     


       // let updatedDealership = dealership
        const {data} = response || {}
        const {listingsCountMakeFacet} = data || {}
        const {num_found, facets} = listingsCountMakeFacet || {}
        const {listings} = listingsCountMakeFacet || []
    //    updatedDealership.listings = listings

     //     const inventory = response.data.listings
//console.log({inventory})

            for(let i=0; i<dealerships.length;i++){
           
              if(dealerships[i].id==dealer.id)
              {
                
                
                updatedDealer =dealerships[i]
                console.log('Found INventory for ', updatedDealer)
                updatedDealer.listings = listings
                updatedDealer.num_found = num_found
                updatedDealer.facets = facets
                
                updatedDealerships[i] = updatedDealer
                updatedMarket.dealerships = updatedDealerships
                dispatch({
                  type: SET_MARKET,
                  payload: {updatedMarket}
              })
              }
            }







    } catch (error) {
      console.log(error);
 
    }
  }
  }

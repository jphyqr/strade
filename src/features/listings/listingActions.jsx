import axios from "axios";
import firebase from '../../app/config/firebase'
import { SELECT_LISTING, UPDATE_LISTING } from "./listingConstants";
import {SET_DEALER} from '../dealer/dealerConstants'
import {SET_MARKET} from '../market/marketConstants'


const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'




export const getCopyVins = (country, dealer, listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {vin} = listing || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getCopyVins`
  try {

console.log('getCopyVins for', vin)



      let response = await axios.post(
          REQUEST_URL,
          {vin:vin},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
 

let updatedDealer = dealer
let updatedListing = listing
        const {data :d1} = response || {}
        const {data : copyListings} = d1 || {}
        console.log('getCopy response.data', copyListings)
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        console.log({d})
        

       let timestamp = parseInt((d.getTime() / 1000).toFixed(0))
       console.log({timestamp})


        let filteredListings = copyListings.filter(listing =>( listing.last_seen_at >timestamp))
        console.log({filteredListings})


      let {listings} = updatedDealer || []
  
            let updatedListings = listings.map(a => {
          var returnValue = {...a};
        
          if (a.id == listing.id) {
           

          updatedListing.copyListings = filteredListings
           
         
  
          }
        
          return returnValue
        })


        
    
     


     
        updatedDealer.listings = updatedListings


     


    
          dispatch({
            type: SET_DEALER,
            payload: {updatedDealer}
        })

   return filteredListings






    
        //   dispatch({
        //     type: UPDATE_LISTING,
        //     payload: {id, updatedListing}
        // })



  } catch (error) {
    console.log(error);

  }
}
}


export const getEMPForVDP = (dealer, listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {vdp_url} = listing || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getEMPForVDP`
  try {

console.log('getEMPForVDP for', vdp_url)



      let response = await axios.post(
          REQUEST_URL,
          {vdp_url:vdp_url},
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
 

let updatedDealer = dealer
let updatedListings = dealer.listings || []
let updatedListing = listing
        const {data :d1} = response || {}
        const {data : EMP_count} = d1 || {}
        console.log('getCopy response.data', EMP_count)
      

     console.log('value', EMP_count[Object.keys(EMP_count)[0]])
     
          updatedListing.EMP_count = EMP_count[Object.keys(EMP_count)[0]]
           
         
          for(let i=0; i<updatedListings.length;i++){
           
            if(updatedListings[i].id==updatedListing.id)
            {
              
              updatedListings[i] = updatedListing
              updatedDealer.listings = updatedListings
             

            dispatch({
              type: SET_DEALER,
              payload: {updatedDealer}
          })
            }
          }

         
      
 


  } catch (error) {
    console.log(error);

  }
}
}



export const getSimilarInventory = (country, dealer, listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {latitude, longitude} = dealer || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getSimilarInventory`
  try {

console.log('getSimilar')



      let response = await axios.post(
          REQUEST_URL,
          {country:country, listing:listing, lat:latitude, lng:longitude, radius:250},
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



export const getMDSForListing = (country, market, listing)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

  const REQUEST_URL = `${GCF_ROOT_URL}/getMDSForListing`
  try {


      let updatedListing = listing
      const {lat, lng, radius} = market || {}
      let response = await axios.post(
          REQUEST_URL,
          { country:country, listing:listing , lat:lat, lng:lng, radius:radius},
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











export const getAveragePriceForYMM = (country, dealer, inventoryItem)=>   {
  return async (dispatch, getState)=>{
  const firestore = firebase.firestore();

const {latitude, longitude} = dealer || {}
  const REQUEST_URL = `${GCF_ROOT_URL}/getAveragePriceForYMM`
  try {





      let response = await axios.post(
          REQUEST_URL,
          { country: country, inventory:inventoryItem, lat:latitude, lng:longitude, radius:250},
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
export const getInitialInventoryAndMakeFacet = (country, market, dealer, owned, used)=>   {


    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    //const jobsRef = firestore.collection("jobs");

    console.log('getInitialInventoryAndMakeFacet')

    const REQUEST_URL = `${GCF_ROOT_URL}/getInitialInventoryAndMakeFacet`
    try {
 
  
     let updatedMarket = market;
     let updatedDealer = dealer;
      const {dealerships} = updatedMarket || []
     let updatedDealerships = dealerships || []
        let response = await axios.post(
            REQUEST_URL,
            { dealer:dealer, country:country, owned:owned, used:used},

            {
              headers: {
                "content-type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
     


       // let updatedDealership = dealership
       console.log('getInitialInventory response', response.data)
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

              dispatch({
                type: SET_DEALER,
                payload: {updatedDealer}
            })
              }
            }







    } catch (error) {
      console.log(error);
 
    }
  }
  }





  //currently getting at map pin load, should only get called when dealership clicked
export const getRemainingInventoryForDealership = (country, market, dealer, owned, used)=>   {


  return async (dispatch, getState)=>{

  console.log('getRemainingInventoryForDealership')

  const REQUEST_URL = `${GCF_ROOT_URL}/getAPageOfInventory`
  try {

let results = []
   let updatedMarket = market;
   let updatedDealer = dealer;
    const {dealerships} = updatedMarket || []
   let updatedDealerships = dealerships || []
     const {num_found, id} = updatedDealer || {}
      const {listings} = updatedDealer || []

      console.log({updatedDealer})
      results = listings
      const currentLoadedCount = listings&&listings.length || {} //10


       let start = currentLoadedCount

       let remaining = num_found - currentLoadedCount
        let pages = parseInt(remaining/50)   
  console.log('getRemainingInventory pages', pages)
       for(var i=0; i<=pages; i++){

         let start=currentLoadedCount+(i*50)
         console.log('getRemainingInventory getting inventory at', start)
        let response = await axios.post(
          REQUEST_URL,
          { dealerId:id, start:start, rows:50, country:country, owned:owned, used:used },
          {
            headers: {
              "content-type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      
console.log('Response', response)

const {data :d1} = response || {}
const {data} = d1 || {}
console.log({data})
  const {listings} = data || []
  results = results.concat(listings)

      }

 console.log('getRemainingInventory results', results)
   


 updatedDealer.listings = results

 dispatch({
   type: SET_DEALER,
   payload: {updatedDealer}
})



  } catch (error) {
    console.log(error);

  }
}
}

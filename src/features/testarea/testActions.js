import axios from "axios";
import firebase from "../../app/config/firebase";
import * as keys from "../../app/config/keys"
const GCF_ROOT_URL = 'https://us-central1-strade-fe535.cloudfunctions.net'


const createKeywords = name => {
    const arrName = [];
    let curName = '';
    name.split('').forEach(letter => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  }
  
  const oneWayTree = (words, gaps) => {

    let set = new Set()
    let setArray = []
    for (var m = 0; m < words.length; m++) {
      //wedget start index
      for (var w = 0; w < words.length; w++) {
        for (var g = 1; g < words.length; g++) {
          for (var s = -1; s < (words && words.length - 1); s++) {
            let skip;
            if (s === -1) skip = [-1];
            else {
              if (m == 0) skip = gaps.slice(s, s + g);
              else {
                //where to put the gap
                const halfWay = parseInt((s + m) / 2);
                const firstHalf = gaps.slice(s, s + w); //first half
                const secondHalf = gaps.slice(s + w + m, s + w + m + g);
                skip = firstHalf.concat(secondHalf);
              }
            }
    
       
            let poppedWord = "";
            let currentWord = "";
            let trailingWords = "" || "";
            for (var u = -1; u < (words && words.length); u++) {
              poppedWord = words[u];
            
              currentWord = poppedWord;
              currentWord += trailingWords;
    
              if (poppedWord && !skip.includes(poppedWord.toString())) {
                //} u != skip) {
                if (!setArray.includes(currentWord)) {
                  setArray.push(currentWord);
                  set = new Set([...set, ...createKeywords(currentWord)]) ;
                }
    
                trailingWords = poppedWord + trailingWords;
              } else {
              
              }
            }
          }
        }
      }
    
    }
  
    return set
  }
  



const generateKeyTree = string => {

  let set = new Set();


 
  

  let backwards = string
  .trim()
  .toLowerCase()
  .replace(/[^\w\s]/gi, "")
  .split(" ").slice(0,6); //stri//["0", "1", "2", "3", "4", "5"];


let words = string
.trim()
.toLowerCase()
.replace(/[^\w\s]/gi, "")
.split(" ").slice(0,6); //stri//["0", "1", "2", "3", "4", "5"];
words.reverse()


let gaps = words.slice(0, words.length - 1);
let backwardsGaps = backwards.slice(0, words.length - 1)

  set = new Set([...set, ...oneWayTree(words, gaps)])
set = new Set([...set, ...oneWayTree(backwards, backwardsGaps)])
 

  
  console.log({ set });

  return [...set]
  
  
  






}





const convertLeading3IntoYear = (entery) =>{


  switch (entery.length) {
  
    case 3:
      if (entery > 195 && entery < 202) 
       entery = entery+"0"
     
      //years  //201 //199  //198 //018      //not years : 150 250

      break;
    case 2:
      if(entery <30 ) //19 20 21 22 23 30
     entery = "2"+"0"+entery
 
    
      break;
    case 1:
      {
        switch(entery){
          case "0":
          entery = "2019"
         
          break;
          case "1":
              entery = "2019"
            
          break;
          case "2":
              entery = "2019"
       
          break;
          default:
             
  
        }
      }
   

      break;
    default:
  }





  return entery
}




  const generateKeywords = ymmt => {

    console.log(ymmt.YMMT)
let string = ymmt.YMMT


return generateKeyTree(ymmt.YMMT)

    const {YMMT, year, make, model,trim} = ymmt;

    let  _make = make&&make.toLowerCase().replace(/\W/g, '')

    let _year = year.substring(2,4).replace(/\W/g, '')
    let _model = model&&model.toLowerCase().replace(/\W/g, '')
    let _YMMT = YMMT&&YMMT.toLowerCase().replace(/\W/g, '')
    let _trim = trim&&trim.toLowerCase().replace(/\W/g, '')
    const kT = _trim.length>0 ? createKeywords(`${_trim}`) : [];
    const kMT = createKeywords(`${_model}${_trim}`);
    const kMaMT = createKeywords(`${_make}${_model}${_trim}`);
    const kMaT = createKeywords(`${_make}${_trim}`);
    const kYMaMT = createKeywords(`${_year}${_make}${_model}${_trim}`);
    const kYMaT = createKeywords(`${_year}${_make}${_trim}`);
    const kYMT = createKeywords(`${_year}${_model}${_trim}`);
    // const keywordNoModel = createKeywords(`${_year}${_make}${_trim}`);
    // const keywordFullSearch = createKeywords(`${_YMMT}`);
    // const keywordModelFirst = createKeywords(`${_model}`);
   
   
   // const keywordLastNameFirst = createKeywords(`${last}, ${first} ${middle}${suffix}`);
    
  // const middleInitial = middle.length > 0 ? ` ${middle[0]}.` : '';
  //  const keywordFullNameMiddleInitial = createKeywords(`${first}${middleInitial} ${last}${suffix}`);
  //  const keywordLastNameFirstMiddleInitial = createKeywords(`${last}, ${first}${middleInitial}${suffix}`);
    return [
      ...new Set([
        '',
        ...kT,
        ...kMT,
        ...kMaMT,
        ...kMaT,
        ...kYMaMT,
        ...kYMaT,
        ...kYMT
      ])
    ];
  }

  function ltrim(str) {
    if(!str) return str;
    return str.replace(/^\s+/g, '');
  }

  




  export const getSalesStats = (year, make, model, trim, city, state, country)=>   {
    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    if(trim.length==0)
    trim = ``

  
    const REQUEST_URL = `${GCF_ROOT_URL}/getSalesStats`
    try {
  
  
           
  
  
        let response = await axios.post(
            REQUEST_URL, 
            {  country: country, year:year, make:make, model:model, trim:trim, city:city, state:state },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json"
                
              }
            }
          );
          console.log({response})
          const {data : d1} = response || {}
          const {data : d2} = d1 || {}
          const {num_found, stats, facets} = d2 || {}
  
       return {num_found, stats, facets}
        // const YMM_STRING = `year=${year}&make=${make}&model=${model}`

        // let AND_TRIM_STRING = ""
        // if(trim.length>0)
        // AND_TRIM_STRING = `&trim=${trim}`
        // const LAT_LNG_RAD_STRING = `latitude=${lat}&longitude=${lng}&radius=${radius}`
        // const PARAM_STRING= `api_key=${keys.marketCheckKey}&${LAT_LNG_RAD_STRING}&start=1&rows=0&stats=price,miles&${YMM_STRING}${AND_TRIM_STRING}`
        

        // const PRICE_MILES_FOR_YMMT = `http://api.marketcheck.com/v1/search?${PARAM_STRING}`
        // const config2 = {
        //    headers: {
           
        //      "content-type": "application/json;charset=utf-8",
        //      "Access-Control-Allow-Origin": "localhost:3000",
        //      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        //    }
        //  };


  


   //let response = await axios.get(PRICE_MILES_FOR_YMMT, config2)
           console.log('getPrice Stas', response)
  
  
    } catch (error) {
      console.log(error);
  
    }
  }
  }
  


  export const getPriceMileStatsForYMMT = (optionsString, fetchOptionsFacet, year, make, model, trim, lat, lng, radius, country)=>   {
    return async (dispatch, getState)=>{
    const firestore = firebase.firestore();
    if(trim.length==0)
    trim = ``

  
    const REQUEST_URL = `${GCF_ROOT_URL}/getPriceMileStatsForYMMT`
    try {
  
  
           
  
  
        let response = await axios.post(
            REQUEST_URL, 
            { optionsString:optionsString, fetchOptionsFacet:fetchOptionsFacet, country: country, year:year, make:make, model:model, trim:trim, lat:lat, lng:lng, radius:radius},
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json"
                
              }
            }
          );
          console.log({response})
          const {data : d1} = response || {}
          const {data : d2} = d1 || {}
          const {num_found, stats, facets} = d2 || {}
  
       return {num_found, stats, facets}
        // const YMM_STRING = `year=${year}&make=${make}&model=${model}`

        // let AND_TRIM_STRING = ""
        // if(trim.length>0)
        // AND_TRIM_STRING = `&trim=${trim}`
        // const LAT_LNG_RAD_STRING = `latitude=${lat}&longitude=${lng}&radius=${radius}`
        // const PARAM_STRING= `api_key=${keys.marketCheckKey}&${LAT_LNG_RAD_STRING}&start=1&rows=0&stats=price,miles&${YMM_STRING}${AND_TRIM_STRING}`
        

        // const PRICE_MILES_FOR_YMMT = `http://api.marketcheck.com/v1/search?${PARAM_STRING}`
        // const config2 = {
        //    headers: {
           
        //      "content-type": "application/json;charset=utf-8",
        //      "Access-Control-Allow-Origin": "localhost:3000",
        //      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        //    }
        //  };


  


   //let response = await axios.get(PRICE_MILES_FOR_YMMT, config2)
           console.log('getPrice Stas', response)
  
  
    } catch (error) {
      console.log(error);
  
    }
  }
  }
  









export const getSearchResultsFromFirestore = Searchvalue => async (
    dispatch,
    getState
  ) => {

    //

    const firestore = firebase.firestore();
   const trimedSearchValue = ltrim(Searchvalue)

   
   let partsOfSearch = trimedSearchValue.replace(/\s/,'&').split('&')

  
  
   let packagedSearch = trimedSearchValue
   
   // if(partsOfSearch&&partsOfSearch.length>1)

   //che becomes "che e"
   {
    let  leadingTerm = partsOfSearch[0]
     let trailingTerm = partsOfSearch[1]
     console.log({leadingTerm})
     console.log({trailingTerm})
     if(leadingTerm.length<4)
     {
      leadingTerm = convertLeading3IntoYear(leadingTerm)
 
     
      packagedSearch = leadingTerm 
      
      if(trailingTerm)
      packagedSearch = packagedSearch + " " + trailingTerm
     }

   }






    try {
 
     let searchSnap= await firestore
          .collection("ymmt_search")

          .where("keywords", "array-contains", packagedSearch.toLowerCase().replace(/\W/g, ''))
          .orderBy("rank")
          .limit(10)
          .get();

          let results = [];
          for (let i = 0; i < searchSnap.docs.length; i++) {
            let evt = { ...searchSnap.docs[i].data(), id: searchSnap.docs[i].id };
            results.push(evt);
          }


      return results

    } catch (error) {
      console.log(error);
    }
  };


export const uploadCSVToFirestore = data => {
    return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      console.log('uploadCSV ..', data)

      try {
          for(var i=1; i<data.length+1; i++){
            let ymmtArray = data[i]
        
            let ymmt = {YMMT:ymmtArray[0], rank: ymmtArray[1], make: ymmtArray[2], model: ymmtArray[3], trim: ymmtArray[4], year: ymmtArray[5]}
          
      ymmt.keywords  = generateKeyTree(ymmt.YMMT)
            if(i%10===0)
             console.log('keywords', i)
           
           
             let createdJob = await firestore.add(`ymmt_search`, ymmt);
          //  console.log({createdJob})
          }


    
      } catch (error) {
          console.log({error})
      }
    };
  };


  export const uploadCSVToDealersTable = data => {
    return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      console.log('uploadCSV ..', data)
   
      try {
      
        for(var i=1; i<data.length+1; i++){
           // console.log('in loop ..', data[i])
            let dealerArray = data[i]
let dealer = {marketcheckId: dealerArray[0], name: dealerArray[2], website: dealerArray[1], type:dealerArray[3], street:dealerArray[4], city:dealerArray[5], state:dealerArray[6], country:dealerArray[7], lat:dealerArray[8],lng:dealerArray[9], zip:dealerArray[10], phone:dealerArray[11], }
let websiteSplit = dealer.website.split(".")

const dealerSearch = `${dealer.name} ${websiteSplit[1]}`
        console.log({dealerSearch})
         
      dealer.keywords  = generateKeyTree(dealerSearch)
            if(i%10===0)
             console.log('keywords', i)
           
           
             let createdJob = await firestore.add(`dealer_search`, dealer);
        
          }


       
      } catch (error) {
          console.log({error})
      }
    };
  };


  export const getDealerSearchResultsFromFirestore = Searchvalue => async (
    dispatch,
    getState
  ) => {

    //

    const firestore = firebase.firestore();
   const trimedSearchValue = ltrim(Searchvalue)

 
  
  

 

   
    try {
 
     let searchSnap= await firestore
          .collection("dealer_search")

          .where("keywords", "array-contains", trimedSearchValue.toLowerCase().replace(/\W/g, ''))
          .orderBy("name")
          .limit(10)
          .get();

          let results = [];
          for (let i = 0; i < searchSnap.docs.length; i++) {
            let evt = { ...searchSnap.docs[i].data(), id: searchSnap.docs[i].id };
            results.push(evt);
          }


      return results

    } catch (error) {
      console.log(error);
    }
  };






  export const uploadedCSVToJAuto = data => {
    return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      console.log('uploadCSV ..', data)
   
      try {
      
        for(var i=1; i<data.length+1; i++){
           // console.log('in loop ..', data[i])
            let dataItem = data[i]
let listing = {id: dataItem[0],  vin: dataItem[1], heading: dataItem[2], price:dataItem[3], miles:dataItem[4], msrp:dataItem[5], data_source:dataItem[6], vdp_url:dataItem[7], carfax_1_owner:dataItem[8], carfax_clean_title:dataItem[9], interior_color:dataItem[10], dom_active:dataItem[13], 

  seller_type:dataItem[14],
  inventory_type:dataItem[15],
  stock_no:dataItem[16],
  year:dataItem[32],
  make:dataItem[33],
  model:dataItem[34],
  trim:dataItem[35],
  body_type:dataItem[36],
  vehicle_type:dataItem[37],

  fuel_type:dataItem[38],
  engine:dataItem[39],
  engine_size:dataItem[40],


  doors:dataItem[41],
  cylinders:dataItem[42],
  made_in: dataItem[43],
  trim_r:dataItem[44],
  body_subtype:dataItem[45],
  transmission:dataItem[46],
  drivetrain:dataItem[47],
  engine_block:dataItem[48],

  steering_type:dataItem[49],
  antibrake_sys:dataItem[50],
  highway_miles:dataItem[57],
  city_miles:dataItem[58],
  content:dataItem[67],




}


            if(i%10===0)
             console.log('keywords', i)
           
           
             let createListing = await firestore.add(`jauto_used_inventory`, listing);
        
          }


       
      } catch (error) {
          console.log({error})
      }
    };
  };

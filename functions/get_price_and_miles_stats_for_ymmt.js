


const request = require('request');
const admin = require('firebase-admin')
const functions = require("firebase-functions");
const axios = require('axios');
const cors = require("cors")({ origin: true });

const MARKETCHECK_API_KEY = functions.config().marketcheck.key;

const MARKETCHECK_CONFIG = {
    headers: {
      Host: "marketcheck-prod.apigee.net"
    }
  };


module.exports = function(req, res){


    return cors(req, res, () => {
     if(req.method !== 'POST') {
      return res.status(401).json({
       message: 'Not allowed'
      })
     }

     res.set({ 'Access-Control-Allow-Origin': '*' })//.sendStatus(200)
//   if(!req.body.accountToken){
//     return res.status(420).json({
//         message: 'No Token'
//        })
//  }
     console.log('get_aver_price_for_ymm body: ' , req.body)
     const {optionsString, fetchOptionsFacet, year, make, model, trim, lat,lng, radius} = req.body
   
     const YMM_STRING = `year=${year}&make=${make}&model=${model}`

     let TRIM_STRING = ""
    //  if(trim.length>0)
    let  AND_TRIM_STRIMG = `&trim=${trim}`

let AND_FACETS = ""
if(fetchOptionsFacet)
 AND_FACETS = `&facets=engine_size, transmission, cylinders, fuel_type, body_type, body_subtype, doors, engine, exterior_color`


const LAT_LNG_RAD_STRING = `latitude=${lat}&longitude=${lng}&radius=${radius}`
const PARAM_STRING= `api_key=${MARKETCHECK_API_KEY}&${LAT_LNG_RAD_STRING}&start=1&rows=0&stats=price,miles&${YMM_STRING}${AND_TRIM_STRIMG}${AND_FACETS}&${optionsString}`

    
     const PRICE_MILES_FOR_YMMT = `http://api.marketcheck.com/v1/search?${PARAM_STRING}`
     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(PRICE_MILES_FOR_YMMT, config2)
     .then(response => {
       console.log(response.data);


       return res.status(200).json({
        data: response.data
       })
     })
     .catch(err => {
        console.log(err);
       return res.status(500).json({
         error: err
       })
     })

  






    })
}
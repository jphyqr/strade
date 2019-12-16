


// const request = require('request');
// const admin = require('firebase-admin')
// const functions = require("firebase-functions");
// const axios = require('axios');
// const cors = require("cors")({ origin: true });

// const MARKETCHECK_API_KEY = functions.config().marketcheck.key;

// const MARKETCHECK_CONFIG = {
//     headers: {
//       Host: "marketcheck-prod.apigee.net"
//     }
//   };


// module.exports = function(req, res){


//     return cors(req, res, () => {
//      if(req.method !== 'POST') {
//       return res.status(401).json({
//        message: 'Not allowed'
//       })
//      }

//      res.set({ 'Access-Control-Allow-Origin': '*' })//.sendStatus(200)
// //   if(!req.body.accountToken){
// //     return res.status(420).json({
// //         message: 'No Token'
// //        })
// //  }
//      console.log('get_aver_price_for_ymm body: ' , req.body)
//      const {country, fetchOptionsFacet, year, make, model, trim, city,state, radius} = req.body
   
//      let YMMT_STRING
//      if(trim.length>0){

//       YMMT_STRIM = `ymmt=${year}|${make}|${model}|${trim}`
//      }else{
//         YMMT_STRIM = `ymm=${year}|${make}|${model}`
//      }

//    let LOCATION_STRING
// let state_code = state;
//    if(country.includes("CA")){
     
//      switch(state){
//     case 'AB' :
//         state_code = 
//     break
//     case 'BC' :
//     break
//     case 'MB':
//     break
//     case 'NB':
//         break
//     case 'NL':
//         break
//     case 'NT':
//       break
//     case 'NS':
//         break
//     case 'NU':
//     break
//     case 'ON':
//     break
//     case 'PE':
//     break
//     case 'QB':
//     break
//     case 'SK':
//     break
//     case 'YT':
//     break
     
 
//      }

//    }else {
//      LOCATION_STRING = `state=${state}`
//    }



// const PARAM_STRING= `api_key=${MARKETCHECK_API_KEY}${YMMT_STRING}&${optionsString}`

    
//      const PRICE_MILES_FOR_YMMT = `http://api.marketcheck.com/v1/sales?${PARAM_STRING}`
//      const config2 = {
//         headers: {
//           Host: "marketcheck-prod.apigee.net"
//         }
//       };

//      return axios.get(PRICE_MILES_FOR_YMMT, config2)
//      .then(response => {
//        console.log(response.data);


//        return res.status(200).json({
//         data: response.data
//        })
//      })
//      .catch(err => {
//         console.log(err);
//        return res.status(500).json({
//          error: err
//        })
//      })

  






//     })
// }
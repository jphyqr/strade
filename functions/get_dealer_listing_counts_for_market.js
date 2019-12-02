





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
//   if(!req.body.accountToken){
//     return res.status(420).json({
//         message: 'No Token'
//        })
//  }
     console.log('get_all_dealerships body: ' , req.body)
     const {lat, lng, radius} = req.body
    const LAT_LNG_RAD_STRING = `latitude=${lat}&longitude=${lng}&radius=${radius}`
    const PARAM_STRING= `rows=0&match=year,make,model,trim&facets=dealer_id|0|200`
       let result = []; 
       let page=0
     const ALL_COUNTS_BY_DEALERSHIP_IN_MARKET = `http://api.marketcheck.com/v1/search/recents?api_key=${MARKETCHECK_API_KEY}&${req.body.country}&${LAT_LNG_RAD_STRING}&${PARAM_STRING}`;
    

     



     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(ALL_COUNTS_BY_DEALERSHIP_IN_MARKET, config2)
     .then(response => {
       console.log(response.data);
       result = (response.data.dealers) 
       console.log('result after first add', result)
       const  {num_found,facets} = response.data

     

       return res.status(200).json({
         data: {num_found:num_found, facets:facets}
       })
     })
     .catch(err => {
       return res.status(500).json({
         error: err
       })
     })







    })
}
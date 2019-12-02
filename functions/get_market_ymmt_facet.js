`http://api.marketcheck.com/v1/search?api_key=1rzzZhML7WeDkmGVu66au43fBG9Np5Vw&latitude=39.7684&longitude=-86.1581&radius=250&car_type=used&start=0&rows=0&facets=year,make,model,trim`




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

     console.log('get_market_ymmt_facet body: ' , req.body)
     const {lat, lng, radius} = req.body
    const PARAM_STRING = `latitude=${lat}&longitude=${lng}&radius=${radius}&start=0&rows=0&facets=year,make,model,trim`
       let result = []; 
       let page=0
     const GET_MARKET_YMMT_FACET = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&${req.body.country}&${PARAM_STRING}`;
    
     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(GET_MARKET_YMMT_FACET, config2)
     .then(response => {
       console.log('YMMT FACET body.data', response.data);
       const  {num_found, facets} = response.data || {}
      

       return res.status(200).json({
         data: {num_found, facets}
       })
     })
     .catch(err => {
       return res.status(500).json({
         error: err
       })
     })







    })
}
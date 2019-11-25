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
     console.log('get_aver_price_for_ymm body: ' , req.body)
     const {listing, lat,lng, radius} = req.body
     const {vin} = listing





const LAT_LNG_RAD_STRING = `latitude=${lat}&longitude=${lng}&radius=${radius}`
const PARAM_STRING= `api_key=${MARKETCHECK_API_KEY}&vin=${vin}&include_sold=true&exact=true&debug=1`

       let result = []; 
       let page=0
     const MDS_FOR_LISTING = `http://api.marketcheck.com/v1/mds?${PARAM_STRING}&${LAT_LNG_RAD_STRING}`
     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(MDS_FOR_LISTING, config2)
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

    //  stripe.accounts.retrieve(
    //     req.body.accountToken,
    //     (err, account) =>{
    //         if(err){
    //             res.status(500).send({error: 'no account'});
    //         }
    //         else{
    //             res.send({ success: true, account:account });
    //         }
    //     }
    //   );






    })
}
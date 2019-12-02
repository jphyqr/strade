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
     console.log('get_inventory_for_ealership body: ' , req.body)
     const dealer = req.body.dealer || {}

     const {id : dealerId}  = dealer || {}

       let result = []; 
       let page=0
     const MODEL_FACET =   `http://api.marketcheck.com/v1/search/recents?api_key=${MARKETCHECK_API_KEY}&${req.body.country}&dealer_id=${dealerId}&facets=model&rows=0`
   const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(MODEL_FACET, config2)
     .then(response => {




       console.log('response.data', response.data);
      console.log('fascet', response.data.facets)
        

      
       return res.status(200).json({
        data : response.data
       })
     })
     .catch(err => {
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
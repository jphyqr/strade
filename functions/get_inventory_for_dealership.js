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
     const {dealershipId} = req.body
 

       let result = []; 
       let page=0
     const DEALER_OWNED_INVENTORY =   `http://api.marketcheck.com/v1/search/recents?api_key=${MARKETCHECK_API_KEY}&dealer_id=${dealershipId}&facets=make`
   const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(DEALER_OWNED_INVENTORY, config2)
     .then(response => {




       console.log('response.data', response.data);
      console.log('fascet', response.data.facets)
        

      
       return res.status(200).json({
        listingsCountMakeFacet : response.data
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
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
     console.log('get_dealer_info body: ' , req.body)
     const {id:dealerId} = req.body





const PARAM_STRING= `api_key=${MARKETCHECK_API_KEY}`

      
     const DEALER_INFO = `http://api.marketcheck.com/v1/dealer/${dealerId}?${PARAM_STRING}`
     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(DEALER_INFO, config2)
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
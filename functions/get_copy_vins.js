//http://{{host}}/history/1FTEW1EP7JKD45628?api_key=1rzzZhML7WeDkmGVu66au43fBG9Np5Vw




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
     console.log('get_page_inventory body: ' , req.body)
   
     const {vin}  = req.body || {}

     const COPY_VIN =   `http://api.marketcheck.com/v1/history/${vin}?api_key=${MARKETCHECK_API_KEY}`
   const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(COPY_VIN, config2)
     .then(response => {




       console.log('response.data', response.data);
   


       return res.status(200).json({
        data : response.data || []
       })
     })
     .catch(err => {
         console.log({err})
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
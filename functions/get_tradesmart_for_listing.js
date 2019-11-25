

const request = require('request');
const admin = require('firebase-admin')
const functions = require("firebase-functions");
const axios = require('axios');
const cors = require("cors")({ origin: true });

const TRADE_SMART_URL = "https://tradein-api.smedia.ca/api/estimate"

const TRADE_SMART_CONFIG = {
    headers: {
      "Content-type": "application/json"
    }
  };


module.exports = function(req, res){


    return cors(req, res, () => {
     if(req.method !== 'POST') {
      return res.status(401).json({
       message: 'Not allowed'
      })
     }

     console.log('get_tradesmart  body: ' , req.body)
     const {year, make, model} = req.body

    const credentials = [{"year":"2010", "make":"Acura", "model":"MDX"}]
  


     return axios.post(TRADE_SMART_URL, credentials, TRADE_SMART_CONFIG)
     .then(response => {
       console.log(response.data);


       return res.status(200).json({
        data: response.data
       })
     })
     .catch(err => {
         console.log(err)
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
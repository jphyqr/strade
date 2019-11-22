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
     const {inventory, lat,lng, radius} = req.body
     const {build} = inventory || {}
     const {year, make, model, trim} = build || {}

       let result = []; 
       let page=0
     const AVERAGE_PRICE_YMM = `http://api.marketcheck.com/v1/search/recents?year=${year}&make=${make}&rows=0&stats=price&model=${model}&price_range=1-9999999&api_key=1rzzZhML7WeDkmGVu66au43fBG9Np5Vw&latitude=34.05&longitude=-118.24&radius=250`
     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(AVERAGE_PRICE_YMM, config2)
     .then(response => {
       console.log(response.data);


       return res.status(200).json({
        data: response.data
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
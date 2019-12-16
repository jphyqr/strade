const request = require('request');
const admin = require('firebase-admin')
const functions = require("firebase-functions");
const axios = require('axios');
const cors = require("cors")({ origin: true });



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
     console.log('get_engaged_users_for_uuid body: ' , req.body)

     const {vdp_url}  = req.body || {}

     const VDP_PER_URL =  `http://tm.smedia.ca/APIs/engaged_user/engagment.php?url=${vdp_url}`
//    const config2 = {
//         headers: {
//           Host: "marketcheck-prod.apigee.net"
//         }
//       };

     return axios.get(VDP_PER_URL)
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

    






    })
}
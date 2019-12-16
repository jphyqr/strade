//http://{{host}}/history/1FTEW1EP7JKD45628?api_key=1rzzZhML7WeDkmGVu66au43fBG9Np5Vw




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

     console.log('get_EMP_for_vdp body: ' , req.body)
   
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
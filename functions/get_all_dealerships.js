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
     console.log('get_all_dealerships body: ' , req.body)
    //  const {lat, lng, radius} = req.body
    
    const LAT_LNG_RAD_STRING = `latitude=${req.body.lat}&longitude=${req.body.lng}&radius=${req.body.radius}`
       let result = []; 
       let page=0
     const DEALER_NEAR_ZIP = `http://api.marketcheck.com/v1/dealers?api_key=${MARKETCHECK_API_KEY}&${req.body.country}&${LAT_LNG_RAD_STRING}&rows=50&start=${page}&sort_order=asc`;
    
     const config2 = {
        headers: {
          Host: "marketcheck-prod.apigee.net"
        }
      };

     return axios.get(DEALER_NEAR_ZIP, config2)
     .then(response => {
       console.log(response.data);
       result = (response.data.dealers) 
       console.log('result after first add', result)
       const  {num_found} = response.data

       if(num_found>50){

        let remainingPages = (parseInt(num_found/50))-1
        console.log({remainingPages})
        if(remainingPages>10)
        remainingPages=10
        for(let i=1; i<=2; i++){
        let  PAGE_URL = `http://api.marketcheck.com/v1/dealers?api_key=${MARKETCHECK_API_KEY}&${req.body.country}&${LAT_LNG_RAD_STRING}&rows=50&start=${i*50}&sort_order=asc`
            axios.get(PAGE_URL, {      headers: {
                Host: "marketcheck-prod.apigee.net"
              }}).then(res=>{
                console.log(`Request#${i}-Res.data:${res.data}`)

                for(let i=0; i<10; i++){
                    console.log('adding to array', res.data.dealers[i])
                    result.push(res.data.dealers[i])
                }
              //  result.push.apply(result, response.data.dealers)
                console.log('result after push..', result)
                console.log('length after push..', result.length)
                return
            }) .catch(err => {
                return res.status(500).json({
                  error: err
                })
              })
        }
       }
       console.log('loop')
       console.log({result})

       return res.status(200).json({
         data: result
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



const request = require('request');
const admin = require('firebase-admin')
const functions = require("firebase-functions");
const axios = require('axios');
const cors = require("cors")({ origin: true });
const _ = require('lodash')
const MARKETCHECK_API_KEY = functions.config().marketcheck.key;

const MARKETCHECK_CONFIG = {
    headers: {
      Host: "marketcheck-prod.apigee.net"
    }
  };



const allMilesStats = [
    {year:2020, milesMean:1766, milesStddev: 10463},
{year:2019, milesMean:7560, milesStddev: 25196},
{year:2018, milesMean:26673, milesStddev: 17149},
{year:2017, milesMean:34426, milesStddev: 19879},
{year:2016, milesMean:42149, milesStddev: 23318},
{year:2015, milesMean:62484, milesStddev: 31454},
{year:2014, milesMean:75204, milesStddev: 34969},
{year:2013, milesMean:86379, milesStddev: 37688},
{year:2012, milesMean:97149, milesStddev: 40532},
{year:2011, milesMean:106600, milesStddev: 43415},
{year:2010, milesMean:113659, milesStddev: 45275},
{year:2009, milesMean:120637, milesStddev: 49707},
{year:2008, milesMean:129000, milesStddev: 52600},
{year:2007, milesMean:136169, milesStddev: 56018},
{year:2006, milesMean:140016, milesStddev: 60917},
{year:2005, milesMean:144790, milesStddev: 61923},
{year:2004, milesMean:148830, milesStddev: 65414},
{year:2003, milesMean:150000, milesStddev: 70000},
{year:2002, milesMean:152000, milesStddev: 71000},
{year:2001, milesMean:155000, milesStddev: 74000},
{year:2000, milesMean:156000, milesStddev: 76000},


]



module.exports =  function(req, res){


    return  cors(req, res, async () => {
     if(req.method !== 'POST') {
      return res.status(401).json({
       message: 'Not allowed'
      })
     }

     res.set({ 'Access-Control-Allow-Origin': '*' })//.sendStatus(200)

     console.log('get_all_trade_stats_for_geo_ymmt body: ' , req.body)
     const {initialSearch, optionsString, year, make, model, trim, lat,lng} = req.body
   


    let milesStats = allMilesStats.filter(obj => {
        return obj.year === parseInt(year)
      }) || {year:2000, milesMean: 160000, milesStddev: 75000}
      
    console.log({milesStats})
    //If initial search: get the facet, and search recents api handle this at search
    let AND_FACETS = ""
    if(initialSearch){
        AND_FACETS = `&facets=engine_size, transmission, cylinders, fuel_type, body_type, body_subtype, doors, engine, exterior_color`
      
    }
  
    //If not, apply options string
   //options string handled from client
   const YMM_STRING = `year=${year}&make=${make}&model=${model}`
   let  AND_TRIM_STRIMG = `&trim=${trim}`

 


      try {

 
        const config2 = {
            headers: {
              Host: "marketcheck-prod.apigee.net"
            }
          };

     

      
        
        
             const INITIAL_100Radi_Recent_noStats = `http://api.marketcheck.com/v1/search/recents?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=100&start=1&rows=0&${YMM_STRING}${AND_TRIM_STRIMG}${AND_FACETS}&${optionsString}`
           
           //Facets And Stats param is resctricted to one field.  
           //On initial search what matters most is stats, so do not add facets
           //If  A+, then will still neeed to grab the facet at end in another call
           //If not A+, and expanding search, then grah facet on next search
           //as we will be using the /search api

             const initial_search_facets = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=250&start=1&rows=0&${YMM_STRING}${AND_TRIM_STRIMG}${AND_FACETS}&${optionsString}`
                   
             let response2 = await axios.get(initial_search_facets, config2)

             console.log('initial_search_facets', response2.data)

           
           
           
             //incase have to grab facet should not get stast as well
            //Can NEVER get multi facet from /recents API, will always 
            //have to call the regular api for facet
             const initial_recents_stats = `http://api.marketcheck.com/v1/search/recents?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=100&start=1&rows=0&stats=price&${YMM_STRING}${AND_TRIM_STRIMG}&${optionsString}`
        
             console.log('initial_recents_stats', initial_recents_stats)
             let response = await axios.get(initial_recents_stats, config2)
             
             let cvGrade = ""
             let countGrade = ""
       

             const {stats} = response.data || {}
     
             const {price} = stats || {}
             const {count : recentPriceCount, mean, stddev} = price || {}
             let summaryObj = {}
             let cvRecent = stddev/mean
             let summaryRecent100 = {recentPriceCount, cvRecent}

        

            
           
              summaryObj = {...summaryObj, milesStats, summaryRecent100}

             const initial_250_stats_facets = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=250&start=1&rows=0&stats=price&${YMM_STRING}${AND_TRIM_STRIMG}${AND_FACETS}&${optionsString}`
             let initial_250_stats_facets_response = await axios.get(initial_250_stats_facets, config2)


             const {stats: stats250, facets} = initial_250_stats_facets_response.data || {}
     
             let optionsArray = []
             let categoriesArray = []
             for (var prop in facets) {
               if (Object.prototype.hasOwnProperty.call(facets, prop)) {
               
                   let item = facets[`${prop}`]
                 
                    if(item&&item.length>1){
                
                    optionsArray.push(item)
                    categoriesArray.push({category:prop, options: facets[`${prop}`]})
                    }
               }
           }

          














             const {price : price250} = stats250 || {}
             const {count : priceCount250, mean :mean250,  stddev: stddev250} = price250 || {}

             let cv250 = stddev250/mean250

            
             cvGrade = 'A'

             switch(true){

               

                case (priceCount250>=30) :
                    cvGrade = cvGrade+'+'
                    break;
                    case (priceCount250>=15) :
                  break;
                 default :
                 cvGrade = cvGrade+'-'
              }

              if(cvRecent<0.25&&recentPriceCount>30)
              cvGrade = cvGrade+'+'

             let summary250 = {priceCount250, cv250, mean250, stddev250}
             summaryObj = {...summaryObj, summary250, cvGrade, facets, categoriesArray}


            console.log('cv', cv250)
             if(cv250>0.33 || priceCount250 < 15){
                 console.log('Downgrade Search')
               //If not converge, then get the inventory search With facet for 500
                const second_500_recents_stats_facets = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=500&start=1&rows=0&stats=price&${YMM_STRING}${AND_TRIM_STRIMG}${AND_FACETS}&${optionsString}`
                let response_second_500_recents_stats_facets = await axios.get(second_500_recents_stats_facets, config2)

                console.log('response_second_500_recents_stats_facets', response_second_500_recents_stats_facets.data)
            

                const {num_found, stats} = response_second_500_recents_stats_facets.data || {}
     
                const {price} = stats || {}
                const {count : priceCount500, mean : mean500, stddev: stddev500} = price || {}
              
                let cv500 = stddev500/mean500
                
                cvGrade = 'B'
                switch(true){

               

                    case (priceCount500>=30) :
                        cvGrade = cvGrade+'+'
                        break;
                        case (priceCount500>=15) :
                      break;
                     default :
                     cvGrade = cvGrade+'-'
                  }

                let summary500 = {priceCount500, cv500, mean500, stddev500}
                summaryObj = {...summaryObj, summary500, cvGrade}
   

                console.log({cv500})
                
                if(cv500>0.33 || priceCount500 < 15){

                    console.log('Downgrade Search AGAIN')
                    //If not converge, then get the inventory search With facet for 500
                     const third_1000_stats = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=1000&start=1&rows=0&stats=price&${YMM_STRING}${AND_TRIM_STRIMG}&${optionsString}`
                     let response_third_1000_stats = await axios.get(third_1000_stats, config2)
     
                     console.log('response_third_1000_stats', response_third_1000_stats.data)
                 


                     const {stats} = response_third_1000_stats.data || {}
     
                     const {price : price1000} = stats || {}
                     const {count : priceCount1000, mean : mean1000, stddev : stddev1000} = price1000 || {}
        
                     let cv1000 = stddev1000/mean1000

                     cvGrade = 'C'

                     switch(true){

               

                        case (priceCount1000>=30) :
                            cvGrade = cvGrade+'+'
                            break;
                            case (priceCount1000>=15) :
                          break;
                         default :
                         cvGrade = cvGrade+'-'
                      }



                     let summary1000 = {priceCount1000, cv1000, mean1000, stddev1000}
                     summaryObj = {...summaryObj, summary1000, cvGrade}
        

console.log({cv1000})
                     if(cv1000>0.33 || priceCount1000 < 15){
                        console.log('Downgrade Search 4th time')


                        const fourth_3000_stats = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&latitude=${lat}&longitude=${lng}&radius=3000&start=1&rows=0&stats=price&${YMM_STRING}${AND_TRIM_STRIMG}&${optionsString}`
                        let response_fourth_3000_stats = await axios.get(fourth_3000_stats, config2)
        

                        const {stats} = response_fourth_3000_stats.data || {}
     
                        const {price : price3000} = stats || {}
                        const {count : priceCount3000, mean : mean3000, stddev : stddev3000} = price3000 || {}
           
                        let cv3000 = stddev3000/mean3000
   


                        cvGrade = 'D'

                        switch(true){

               

                            case (priceCount3000>=30) :
                                cvGrade = cvGrade+'+'
                                break;
                                case (priceCount3000>=15) :
                              break;
                             default :
                             cvGrade = cvGrade+'-'
                          }

                        let summary3000 = {priceCount3000, cv3000, mean3000, stddev3000}
                        summaryObj = {...summaryObj, summary3000, cvGrade}
           

                        if(cv3000>0.33 || priceCount3000 < 15){
                            console.log('Downgrade Search 5th time')

                            const fifth_no_radius_stats = `http://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&start=1&rows=0&stats=price&${YMM_STRING}${AND_TRIM_STRIMG}&${optionsString}`
                        let response_fifth_no_radius_stats = await axios.get(fifth_no_radius_stats, config2)
                        const {stats} = fifth_no_radius_stats.data || {}
     
                        const {price : priceAll} = stats || {}
                        const {count : priceCountAll, mean : meanAll, stddev : stddevAll} = priceAll || {}
           
                        let cvAll = stddevAll/meanAll

                        if(cvAll>0.5||priceCountAll<15)
                        cvGrade = 'F'
                        else
                        cvGrade = 'E'

                        switch(true){

               

                            case (priceCountAll>=30) :
                                cvGrade = cvGrade+'+'
                                break;
                                case (priceCountAll>=15) :
                              break;
                             default :
                             cvGrade = cvGrade+'-'
                          }
                        let summaryAll = {priceCountAll, cvAll, meanAll, stddevAll}
                        summaryObj = {...summaryObj, summaryAll, cvGrade}

                        return res.status(200).json({
                            //just testing for facet
                            data: {...response_fifth_no_radius_stats.data, ...summaryObj}
                           })




                        }


                        console.log('response_fifth_no_radius_stats', response_fifth_no_radius_stats.data)
                    
                        return res.status(200).json({
                            //just testing for facet
                            data: {...response_fourth_3000_stats.data, ...summaryObj}
                           })

                     }




                     return res.status(200).json({
                        //just testing for facet
                        data: {...response_third_1000_stats.data, ...summaryObj}
                       })
                

                }


                
                return res.status(200).json({
                    //just testing for facet
                    data: {...response_second_500_recents_stats_facets.data, ...summaryObj}
                   })
            
            
            
            } else{
                return res.status(200).json({
                    //just testing for facet
                    data: {...response.data, ...summaryObj}
                   })

             }
    


       
       




       

      

        

       

      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error
        })
      }

    
  
  






    })
}
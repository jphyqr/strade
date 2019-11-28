
import firebase from "../../app/config/firebase";


const createKeywords = name => {
    const arrName = [];
    let curName = '';
    name.split('').forEach(letter => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  }
  
  
  const generateKeywords = ymmt => {
    const {YMMT, year, make, model,trim} = ymmt;
    let  _make = make&&make.toLowerCase()
    let _year = year.substring(2,4)
    let _model = model&&model.toLowerCase()
    let _YMMT = YMMT&&YMMT.toLowerCase()
    let _trim = trim&&trim.toLowerCase()
    const kT = _trim.length>0 ? createKeywords(`${_trim}`) : [];
    const kMT = createKeywords(`${_model} ${_trim}`);
    const kMaMT = createKeywords(`${_make} ${_model} ${_trim}`);
    const kMaT = createKeywords(`${_make} ${_trim}`);
    const kYMaMT = createKeywords(`${_year} ${_make} ${_model} ${_trim}`);
    const kYMaT = createKeywords(`${_year} ${_make} ${_trim}`);
    const kYMT = createKeywords(`${_year} ${_model} ${_trim}`);
    // const keywordNoModel = createKeywords(`${_year}${_make}${_trim}`);
    // const keywordFullSearch = createKeywords(`${_YMMT}`);
    // const keywordModelFirst = createKeywords(`${_model}`);
   
   
   // const keywordLastNameFirst = createKeywords(`${last}, ${first} ${middle}${suffix}`);
    
  // const middleInitial = middle.length > 0 ? ` ${middle[0]}.` : '';
  //  const keywordFullNameMiddleInitial = createKeywords(`${first}${middleInitial} ${last}${suffix}`);
  //  const keywordLastNameFirstMiddleInitial = createKeywords(`${last}, ${first}${middleInitial}${suffix}`);
    return [
      ...new Set([
        '',
        ...kT,
        ...kMT,
        ...kMaMT,
        ...kMaT,
        ...kYMaMT,
        ...kYMaT,
        ...kYMT
      ])
    ];
  }




export const getSearchResultsFromFirestore = Searchvalue => async (
    dispatch,
    getState
  ) => {

    const firestore = firebase.firestore();
   const trimedSearchValue = Searchvalue.trim()
   let sv = ""
   console.log({trimedSearchValue})
    if(trimedSearchValue==="2" || trimedSearchValue==="20"){
      sv="20"
    } else if(trimedSearchValue==="201"){
      sv="19"
    } else if(trimedSearchValue>0 && trimedSearchValue<2025){
      sv = trimedSearchValue.substring(trimedSearchValue.length-2,trimedSearchValue.length) 
    } else{
      sv=trimedSearchValue
    }

    console.log({sv})

   let splitString = trimedSearchValue.split(" ")
    let year=splitString[0].slice(-2)
    console.log({year})
    let updatedString
    if(splitString.length>1&&splitString[0]>0&&splitString[0]<3000)
    updatedString = `${year} ${splitString[1]}`
    else
    updatedString = sv
console.log({updatedString})
    try {
 
     let searchSnap= await firestore
          .collection("ymmt_search")

          .where("keywords", "array-contains", updatedString.toLowerCase())
          .orderBy("rank")
          .limit(10)
          .get();

          let results = [];
          for (let i = 0; i < searchSnap.docs.length; i++) {
            let evt = { ...searchSnap.docs[i].data(), id: searchSnap.docs[i].id };
            results.push(evt);
          }


      return results

    } catch (error) {
      console.log(error);
    }
  };


export const uploadCSVToFirestore = data => {
    return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      console.log('uploadCSV ..', data)
      //dont need to bring in getFIrebase just to get the user
     // const user = firestore.auth().currentUser;
    //  const photoURL = getState().firebase.profile.photoURL; //can hook into redux state get whatever we want: firebase is the reducer
      //need to shape job for what we want to store inside firestore
    //  let newJob = createNewJob(user, photoURL, job);
  

   // const db = firebaseAdmin.firestore()
  //  const fs = require('fs')
   // const csvSync = require('csv-parse/lib/sync')
  //  const file = 'CSVDATAFILE'
   // let data = fs.readFileSync(file)
   // let responses = csvSync(data)
    
    // convert CSV data into objects
    // let objects = []
    

    // responses.forEach(function(response) {
    //   objects.push({
    //     field0: response[0],
    //     field1: response[1],
    //     field2: response[2]
    //   })
    // }, this)



//console.log({responses})


   //   console.log("createJob after showstate", newJob);
      try {
          for(var i=1; i<100; i++){
            let ymmtArray = data[i]
            console.log({ymmtArray})
            let ymmt = {YMMT:ymmtArray[0], rank: ymmtArray[1], make: ymmtArray[2], model: ymmtArray[3], trim: ymmtArray[4], year: ymmtArray[5]}
          
      ymmt.keywords  = generateKeywords(ymmt)
            if(i%100===0)
             console.log('keywords', i)
            let createdJob = await firestore.add(`ymmt_search`, ymmt);
          //  console.log({createdJob})
          }


        
        // await firestore.set(`job_attendee/${createdJob.id}_${user.uid}`, {
        //   jobId: createdJob.id,
        //   userUid: user.uid,
        //   jobDate: job.date,
        //   title: createdJob.title,
        //   inDraft: true,
        //   owner: true,
        //   date: Date.now()
        // });
      } catch (error) {
          console.log({error})
      }
    };
  };
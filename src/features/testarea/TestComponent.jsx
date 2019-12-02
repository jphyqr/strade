import React, { Component } from 'react'
import {connect} from 'react-redux'
import LookupBox from '../common/lookup/LookupBox/LookupBox'
import { Button, Header, Divider } from 'semantic-ui-react'
import {uploadCSVToFirestore, uploadCSVToDealersTable} from './testActions'
import CSVReader from 'react-csv-reader'
import DealerLookupBox from '../common/lookup/LookupBox/DealerLookupBox'

const mapState = (state) => ({
    data:state.test.data
})

const actions = {
    uploadCSVToFirestore, uploadCSVToDealersTable
}




// import "./styles.css";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use Parcel to bundle this sandbox, you can find more info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
// let words = ["0", "1", "2", "3", "4", "5"];
// let gaps = ["0", "1", "2", "3", "4", "5"];
// gaps = gaps.splice(0, words.length - 1);
// console.log({ gaps });
// //let gaps = [];
// let setArray = [];

// //loop for upper addound

// //introduce skip param.
// //start 0, skip up until 2, so less then i[lenfth-2]
// //m = wedge magnitude
// for(var m=0;m<(words.length-2); m++){

 
// //wedget start index
//  for(var w=1; w<(words.length-3); w++)
//  {

//   for(var g=1; g<(words.length); g++){


//     for (var s = -1; s < (words && words.length - 1); s++) {
      
//       let skip
//       if(s===-1)
//       skip = [-1]
//       else{
//         if(m==0)
//         skip=gaps.slice(s,(s+g));
//         else{ //where to put the gap
//       const halfWay = parseInt((s+m)/2)
//         const firstHalf = gaps.slice(s,halfWay) //first half
//         const secondHalf = gaps.slice((halfWay+1),(s+m))
//         skip = firstHalf.concat(secondHalf)
//         }
//       }
      
    
    
      
//       console.log({skip}) 
//       let poppedWord = "";
//       let currentWord = "";
//       let trailingWords = "" || "";
//       for (var u = -1; u < (words && words.length); u++) {
//         poppedWord = words[u];
//         currentWord = poppedWord;
//         currentWord += trailingWords;
      
//         if (poppedWord && !skip.includes(u.toString())){//} u != skip) {
//           if (!setArray.includes(currentWord)) setArray.push(currentWord);
    
//           trailingWords = poppedWord + trailingWords;
//         } else {
//           console.log("SKIPPING..", poppedWord);
//         }
//       }
//     }
//     }



//  }









// }


// console.log({ setArray });



















 class TestComponent extends Component {

state={_searchInput:""}

handleUpdateSearch = (input) =>{
    this.setState({_searchInput: input})
}

    render() {





        return (
            <div>
              <Header>YMMT Lookups</Header>
               <LookupBox  handleUpdateSearch={this.handleUpdateSearch} searchValue={this.state._searchInput}/>
               <Button onClick={()=>this.props.uploadCSVToFirestore()}>Upload CSV To Firebase</Button>
               <CSVReader onFileLoaded={data => this.props.uploadCSVToFirestore(data)} />
          <Divider></Divider>

          <Header>Dealer Lookups</Header>
               <DealerLookupBox  searchValue={this.state._searchInput}/>
               <Button onClick={()=>this.props.uploadCSVToFirestore()}>Upload CSV To Firebase</Button>
               <CSVReader onFileLoaded={data => this.props.uploadCSVToDealersTable(data)} />
          
            </div>
        )
    }
}


export default connect(mapState, actions)(TestComponent)
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {getSearchResultsFromFirestore, getDealerSearchResultsFromFirestore} from '../../../testarea/testActions'
import { compose } from 'redux'
import { geolocated } from "react-geolocated";
 
 




const initialState = { _lng:'', _lat: '', _isLoading: false, _results: [], _value: '' , _source:[], _marketcheckId:''}

const actions = {getSearchResultsFromFirestore, getDealerSearchResultsFromFirestore}


const mapState = (state) => {
    
  const dealer =   state.firestore.ordered.dealer || []

  let source = []
  dealer.forEach(item=>source.push({title:item.name}))
  return  {
source:source


}
}

 class DealerLookupBox extends Component {


  async componentWillMount(){
  
  }

    


state = initialState

    handleResultSelect = async (e, { result }) => {
      
     
     await this.setState({ _value: result.title , _marketcheckId: result.id, _lat:result.lat, _lng: result.lng})
     await this.props.handleUpdateMarketAroundDealer(this.state._lat, this.state._lng, 250, this.state._marketcheckId)
    }

    handleSearchChange = async (e, { value }) => {


   

       await   this.setState({ _isLoading: true, _value:value })
   

    
        let res = await this.props.getDealerSearchResultsFromFirestore(this.state._value)

        console.log({res})

        let source = []
        res&&res.forEach(item=>source.push({title:item.name, lat:item.lat, lng:item.lng, id:item.marketcheckId}))

        this.setState({_source:source})
  
        setTimeout(() => {
          if (this.state._value.length < 1) return this.setState(initialState)
    
  

         // const re = new RegExp(_.escapeRegExp(this.state._value), 'i')
      //    const isMatch = (result) => re.test(result.title)
    
          this.setState({
            _isLoading: false,
            _results: this.state._source,  //_.filter(this.state._source, isMatch),
          })
        }, 300)
   //     } else {
            // it isn't
 //       }

      }


    render() {
        const {_isLoading, _results, _value} = this.state || {}
        return (
            <div style={{width:'100%', height:'200px', backgroundColor:"lightGrey"}}>
                        <Search
            fluid
            loading={_isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={ _.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={_results}
            value={_value}
            {...this.props}
          />  
            </div>
        )
    }
}


export default compose(connect(mapState, actions),  geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
}))(DealerLookupBox)




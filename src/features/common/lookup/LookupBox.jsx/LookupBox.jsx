import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {getSearchResultsFromFirestore} from '../../../testarea/testActions'
import { compose } from 'redux'
const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))
  

const initialState = { _isLoading: false, _results: [], _value: '', _yearEntered:false , _source:[]}

const actions = {getSearchResultsFromFirestore}
const query = ({searchValue})=>{              

return [{
    collection: "ymmt_search",
       orderBy: ["rank", "asc"],
    where : [['keywords', 'array-contains', searchValue]],

    
  //  limit: 10,
    storeAs: "ymmt"
}]
}

const mapState = (state) => {
    
  const ymmt =   state.firestore.ordered.ymmt || []

  let source = []
  ymmt.forEach(item=>source.push({title:item.YMMT}))
  return  {
source:source


}
}

 class LookupBox extends Component {


    // componentWillReceiveProps=(nextProps)=>{
    //     if(!_.isEqual(nextProps.searchValue,this.state._value)){
         
    //         this.setState({_value:nextProps.searchValue})
    //     }}


state = initialState

    handleResultSelect = (e, { result }) => this.setState({ _value: result.title })

    handleSearchChange = async (e, { value }) => {

 //   this.props.handleUpdateSearch(value)

  

//    if ((value.length===5&&value.charAt(value.length-1)===" ")||(value.length<5&&value.charAt(value.length-1) >= '0' && value.charAt(value.length-1) <= '9')) {
 
       await   this.setState({ _isLoading: true, _value:value })
   

      //  console.log('value', value)

       
    
        let res = await this.props.getSearchResultsFromFirestore(this.state._value)

        console.log({res})

        let source = []
        res&&res.forEach(item=>source.push({title:item.YMMT}))

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


export default compose(connect(mapState, actions), firestoreConnect(props=>query(props)))(LookupBox)
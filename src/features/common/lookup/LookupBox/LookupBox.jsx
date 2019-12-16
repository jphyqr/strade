import React, { Component } from 'react'
import { Search, Loader, Dimmer, Segment } from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {getSearchResultsFromFirestore, getPriceMileStatsForYMMT} from '../../../testarea/testActions'
import { compose } from 'redux'
import { geolocated } from "react-geolocated";
import Geocode from 'react-geocode'
import AbstractLabel from './AbstractLabel'
import OptionSelect from './OptionSelect'
import { randomList, forceDescriptives } from '../../../../app/common/util/helpers'
 
const convertLeading3IntoYear = (entery) =>{


  switch (entery.length) {
  
    case 3:
      if (entery > 195 && entery < 202) 
       entery = entery+"0"
     
      //years  //201 //199  //198 //018      //not years : 150 250

      break;
    case 2:
      if(entery <30 ) //19 20 21 22 23 30
     entery = "2"+"0"+entery
 
    
      break;
    case 1:
      {
        switch(entery){
          case "0":
          entery = "2019"
         
          break;
          case "1":
              entery = "2019"
            
          break;
          case "2":
              entery = "2019"
       
          break;
          default:
             
  
        }
      }
   

      break;
    default:
  }





  return entery
}


const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }))
  

const initialState = {_city:{}, _state:{}, _dataPoints: [], _priceMin: {}, _priceMax:{}, _optionsString: "", _fetchOptionsFacet: true,  _categoriesIndex:{},  _marketSearchComplete: false, _CV: {}, _loadAll: false, _loadWider:false,  _loadLocation: false, _loadInitialMV: false,  _numFound:{}, _priceCount: {},     _priceMean:{},  _priceStddev:{}, _milesMean: {}, _make:{}, _model:{}, _year:{}, _trim:{}, _radius: 500, _location: {}, _country: {}, _lat: {}, _lng: {}, _isLoading: false, _results: [], _value: '', _yearEntered:false , _source:[]}

const actions = {getSearchResultsFromFirestore, getPriceMileStatsForYMMT}




 class LookupBox extends Component {




  componentDidUpdate = async (prevProps, prevState) =>{

    const {coords} = this.props || {}
    const {latitude, longitude} = coords|| {}
    if(!_.isEqual(latitude,this.state._lat)){

        await this.setState({_lat:latitude, _lng:longitude})
        
        if(this.state._lat&&this.state._lng){ 
        let location = await  Geocode.fromLatLng(this.state._lat,this.state._lng)

        const {plus_code} =location || {}
        const {compound_code} = plus_code || {}
    

        let terms = compound_code.split(" ")
        let city = terms[1].replace(/\W/g, '')
        let state = terms[2].replace(/\W/g, '')
        let country = terms[3].replace(/\W/g, '')
        
        if(compound_code&&compound_code.includes("Canada"))
        country = 'country=CA'
        else if (compound_code&&compound_code.includes("USA"))
        country = 'country=US'
        else
        country = 'country=ALL'
        
       

      await this.setState({_location: location, _country:country, _city:city, _state:state})

        }
     }
  

    if(!_.isEqual(this.state._categoriesArray, prevState._categoriesArray)){
      console.log('Change of arrays', this.state._categoriesArray)
      if(this.state._categoriesArray.length===0)
      {
        console.log('EMPTIED THE CLIP')

        await this.setState({_loadInitialMV: true})
       
        const {_optionsString,  _fetchOptionsFacet, _year, _make, _model, _trim, _lat, _lng, _radius, _country} = this.state
        let results = await this.props.getPriceMileStatsForYMMT(_optionsString, _fetchOptionsFacet, _year, _make, _model, _trim, _lat, _lng, _radius, _country)
         await this.expandSearch(results)



      }
    }

  
  }





  async componentDidMount(){
  
    const {coords} = this.props || {}
    const {latitude, longitude} = coords || {}
    console.log('CWM ..', latitude)

    await this.setState({_loadLocation: true})
  await this.setState({_lat: latitude, _lng: longitude})



  if(this.state._lat&&this.state._lng){
    let location = await  Geocode.fromLatLng(this.state._lat,this.state._lng)

    const {plus_code} =location || {}
    const {compound_code} = plus_code || {}
    let terms = compound_code.split(" ")
    let city = terms[1].replace(/\W/g, '')
    let state = terms[2].replace(/\W/g, '')
    let country = terms[3].replace(/\W/g, '')
    
    if(compound_code&&compound_code.includes("Canada"))
    country = 'country=CA'
    else if (compound_code&&compound_code.includes("USA"))
    country = 'country=US'
    else
    country = 'country=ALL'
    
   

  await this.setState({_location: location, _country:country, _city:city, _state:state})

       
  await this.setState({_loadLocation: false})

}

  }



async generateGraphPoints(){
  console.log('generateGraphPoints')
const {_priceMin, _priceMax, _priceStddev, _priceCount, _priceMean} = this.state || {}

let random = forceDescriptives(randomList(_priceCount, _priceMin, _priceMax ), _priceMean, _priceStddev) || []
console.log({random})
this.setState({_dataPoints:random})

}


 


  handleSelectOptionsFromCategory = async (optionIndex) =>{

   
  let cat = this.state._categoriesArray[0]
  const {category:key} = cat || ""
  const {options} = cat || [] 
  const value = options&&options[optionIndex]&&options[optionIndex].item
  console.log({cat})
   const append = `${key}=${value}`

  await this.setState({_optionsString: this.state._optionsString+append})
let reducedArray = this.state._categoriesArray.splice(1,this.state._categoriesArray.length-1)
  await this.setState({_categoriesArray: reducedArray})

  }

 expandSearch = async (results) =>{
  const {_optionsString, _fetchOptionsFacet, _year, _make, _model, _trim, _lat, _lng, _radius, _country, _city, _state} = this.state
     
  const {num_found , stats, facets} = results || {}
  const {price, miles} = stats || {}
  const {count : milesCount, mean: milesMean} = miles || {}
  const {count: priceCount, mean: priceMean, median: priceMedian, stddev: priceStddev, min:priceMin, max:priceMax} = price || {}
await  this.setState({_numFound:num_found, _priceCount:priceCount, _priceMean:priceMean, _priceStddev: priceStddev, _milesMean: milesMean, _CV:(priceStddev/priceMean), _priceMin: priceMin, _priceMax:priceMax})
await this.setState({_loadInitialMV: false})
console.log('did first search, should we do another?', this.state._numFound)
if((this.state._CV>.3)||(this.state._numFound<15)){
  console.log('entered the loop')
await this.setState({_radius:1000})
await this.setState({_loadWider:true})

let widerResults = await this.props.getPriceMileStatsForYMMT(_optionsString, _fetchOptionsFacet, _year, _make, _model, _trim, _lat, _lng, _radius, _country)
console.log({widerResults})
const {num_found , stats} = widerResults || {}
console.log ({num_found})
console.log ({stats})
const {price, miles, facets} = stats || {}
const {count : milesCount, mean: milesMean} = miles || {}
const {count: priceCount, mean: priceMean, median: priceMedian, stddev: priceStddev, min:priceMin, max:priceMax} = price || {}
await this.setState({_loadWider:false})


}

if(this.state._CV>.3||this.state._numFound<15){
await this.setState({_radius:5000})
await this.setState({_loadAll:true})

let widerResults = await this.props.getPriceMileStatsForYMMT(_year, _make, _model, _trim, _lat, _lng, _radius, _country)

const {num_found , stats} = widerResults || {}
console.log ({num_found})
console.log ({stats})
const {price, miles} = stats || {}
const {count : milesCount, mean: milesMean} = miles || {}
const {count: priceCount, mean: priceMean, median: priceMedian, stddev: priceStddev} = price || {}

await this.setState({_loadAll:false})


}

console.log('about to Generate Graph Points')
await this.generateGraphPoints()

//await this.getSalesStats(_year, _make, _model, _trim, _city, _state, _country)
this.setState({ _marketSearchComplete:true})



}


state = initialState


handleBackButtonClick = ()=>{
  this.setState(initialState)
}

    handleResultSelect = async (e, { result }) => {

      await this.setState({_loadInitialMV: true})
      await this.setState({ _value: result.title , _make: result.make, _model: result.model, _trim:result.trim, _year: result.year})
  
      const {_optionsString, _fetchOptionsFacet, _year, _make, _model, _trim, _lat, _lng, _radius, _country} = this.state
      let results = await this.props.getPriceMileStatsForYMMT(_optionsString, _fetchOptionsFacet, _year, _make, _model, _trim, _lat, _lng, _radius, _country)





      
      const {num_found , stats, facets} = results || {}

      console.log('stats initial', stats)
   //only do this on first call, after that drop facets and shoudl get back nothing
   console.log({facets})
    if(facets){
      console.log('FIRST CALL WITH FACET')
      let optionsArray = []
      let categoriesArray = []
      for (var prop in facets) {
        if (Object.prototype.hasOwnProperty.call(facets, prop)) {
            console.log({prop})
            let item = facets[`${prop}`]
            console.log({item})
             if(item&&item.length>1){
         
             optionsArray.push(item)
             categoriesArray.push({category:prop, options: facets[`${prop}`]})
             }
        }
    }

    console.log({optionsArray})
    console.log({categoriesArray})

    if(categoriesArray&&categoriesArray.length>0)
    { //Have options, show options flow
      await this.setState({ _categoriesArray: categoriesArray,  _fetchOptionsFacet:false, _loadInitialMV:false})

    } else {
       this.expandSearch(results)

    }
   


    } 
    else{
 
      this.expandSearch(results)
    }
     

    




  

    }

    handleSearchChange = async (e, { value }) => {



       await   this.setState({ _isLoading: true, _value:value })
   

    
        let res = await this.props.getSearchResultsFromFirestore(this.state._value)

        console.log({res})

        let source = []
        res&&res.forEach(item=>source.push({title:item.YMMT, make: item.make, model:item.model, trim:item.trim, year:item.year}))

        this.setState({_source:source})
  
        setTimeout(() => {
          if (this.state._value.length < 1) return this.setState(initialState)
    
  

  
    
          this.setState({
            _isLoading: false,
            _results: this.state._source,  //_.filter(this.state._source, isMatch),
          })
        }, 300)

      }


    render() {
        const { _categoriesArray, _priceStddev, _categories, _categoriesIndex, _marketSearchComplete, _loadAll, _loadWider, _loadInitialMV, _year, _make, _model, _trim, _isLoading, _results, _value, _country, _radius, _milesMean, _numFound, _priceCount, _priceMean,  _CV} = this.state || {}
        return (
            <Segment style={{width:'100%', height:'200px', backgroundColor:"lightGrey"}}>
                    {(_categoriesArray&&_categoriesArray.length)>0? <OptionSelect categoriesArray={_categoriesArray} handleSelectOptionsFromCategory={this.handleSelectOptionsFromCategory}></OptionSelect> :   _marketSearchComplete?  <AbstractLabel dataPoints={this.state._dataPoints} handleBackButtonClick={this.handleBackButtonClick} radius={_radius} ymmt={_value} numFound={_numFound} priceMean={_priceMean} priceStddev ={_priceStddev} CV={_CV}></AbstractLabel>:    <Search
            fluid
            loading={_isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={ _.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={_results}
            value={_value}
            {...this.props}
    />  }
        {_.isEmpty(_country)? 
        <Dimmer active>
        <Loader  content='Loading Location...' /></Dimmer>
    : _loadInitialMV ?    
    <Dimmer active>
        <Loader active content={`Checking ${_radius} miles`} /> </Dimmer>
     : _loadWider ?    
     <Dimmer active>
         <Loader active content={`Checking ${_radius} miles`} /> </Dimmer> :
_loadAll ?    
<Dimmer active>
    <Loader active content={`Checking ${_radius} miles`} /> </Dimmer>:

          <div className='stateCard'>
          {!_.isEmpty(_country)&& <div>{_country}</div>}
          <div>search radius: {_radius}</div>
          {!_.isEmpty(_year)&&<div>year: {_year}</div>}
          {!_.isEmpty(_make)&&<div>_make: {_make}</div>}
          {!_.isEmpty(_model)&&<div>_model: {_model}</div>}
          {!_.isEmpty(_trim)&&<div>_trim: {_trim}</div>}
          {!_.isEmpty(_numFound)&&<div>_numFound: {_numFound}</div>}
          {!_.isEmpty(_priceCount)&&<div>_priceCount: {_priceCount}</div>}
          {!_.isEmpty(_priceMean)&&<div>_priceMean: {_priceMean}</div>}
          {!_.isEmpty(_priceStddev)&&<div>_priceStddev: {_priceStddev}</div>}
          {!_.isEmpty(_milesMean)&&<div>_milesMean: {_milesMean}</div>}
          {/* <div>make radius: {_make}</div>
          <div>modekl radius: {_model}</div>
          <div>trim radius: {_trim}</div> */}
          </div>}
        </Segment>
        )
    }
}


export default compose(connect(null, actions),  geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
}))(LookupBox)




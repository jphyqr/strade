import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getAllDealershipsForDashboardByArea, selectDealership} from '../dealershipActions'
import scrollToComponent from "react-scroll-to-component";
import {getAllInventoryForADealership, getAveragePriceForYMM, getPhotosForListing, selectListing} from '../../inventory/listingActions'
import DealershipMap from './DealershipMap'
import _ from 'lodash'
import Slider from '../../inventory/Slider'
import SliderCarousel from '../../inventory/SliderCarousel'
const actions = {
    getAllDealershipsForDashboardByArea,selectDealership, getAllInventoryForADealership, getAveragePriceForYMM, getPhotosForListing, selectListing
}

const mapState = state =>({
    dealerships: state.dealerships,
    dealership:state.dealership,
    listing: state.listing
})



class DealershipDashboard extends Component {


  state={
      lat:39.7684,
      lng:-86.1581,
      radius:250,
      _dealership: {},
      _dealerships: [],
      _listing: {}
  }


componentWillReceiveProps = (nextProps) => {
    if(!_.isEqual(nextProps.dealership,this.state._dealership)){
        console.log('Dealership Changed')
        this.setState({_dealership:nextProps.dealership})
    }

    if(!_.isEqual(nextProps.dealerships,this.state._dealerships)){
        
        this.setState({_dealerships:nextProps.dealerships})
    }

    if(!_.isEqual(nextProps.listing,this.state._listing)){
       
        this.setState({_listing:nextProps.listing})
    }
}
handleGatherListingMeta = async (item) =>{
    await this.props.getAveragePriceForYMM(this.state._dealership, item)
    await this.props.getPhotosForListing(this.state._dealership, item) 

}

handleSelectListing = async (listing) =>{
    console.log('handleSelectListing Dashboard reached')
     
    await this.props.selectListing(listing)
}

   handleClickOnDealership = async (dealership) =>{
    console.log('handleClickonDealership..', dealership)
    await this.props.selectDealership(dealership)
  //  await this.props.getAllInventoryForADealership(this.props.dealership)
}

scrollToMyRef = (eChild, offset) => {
    scrollToComponent(eChild.currentTarget, {
      offset: -110 + offset,
      align: "top",
      duration: 600
    });
  };

  async componentWillMount() {



 
    const LAT_LNG = {lat:this.state.lat, lng: this.state.lng} ||{}
    await  this.props.getAllDealershipsForDashboardByArea(LAT_LNG, this.state.radius)
  }

    render() {

        //STATE VARIABLES
        const {_dealership, _dealerships, _listing} = this.state || {}
        //ACTIONS
        const {    getAllDealershipsForDashboardByArea,selectDealership, getAllInventoryForADealership, getAveragePriceForYMM, getPhotosForListing, selectListing} = this.props || {}

        //PROPS

 
        const {listings} = _dealership || {}
        
        return (
         <div style={{height:2000}}>
            <div style={{ backgroundColor:"blue", height:400, width:400}}>
                <DealershipMap  lat={this.state.lat} lng={this.state.lng} radius={this.state.radius} dealerships={_dealerships} handleClickOnDealership={this.handleClickOnDealership}/>
            </div>
          
               <SliderCarousel
               items={listings}
               listing={_listing}
               handleLoadItem={this.handleGatherListingMeta}
               handleClickItem={this.handleSelectListing}
               dealership={_dealership}
                scrollToMyRef={this.scrollToMyRef}



               ></SliderCarousel>
        <div>


        </div>
        </div>
          
        )
    }
}



export default connect(mapState, actions)(DealershipDashboard)
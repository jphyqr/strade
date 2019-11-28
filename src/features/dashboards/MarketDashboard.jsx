import React, { Component } from 'react'
import {connect} from 'react-redux'
import scrollToComponent from "react-scroll-to-component";
import MarketMap from '../market/MarketMap/MarketMap'
import _ from 'lodash'
import Slider from '../listings/SelectedDealerCarousel/Slider/Slider'
import SliderCarousel from '../listings/SelectedDealerCarousel/SliderCarousel'
import { Grid } from 'semantic-ui-react';
import DealerProfile from '../dealer/DealerStatCard';

import {getMDSForListing,  getTradeSmartForListing, getSimilarInventory, getAllInventoryForADealer, getAveragePriceForYMM, getPhotosForListing, selectListing} from '../listings/listingActions'
import { selectDealer,getModelFacetForDealer} from '../dealer/dealerActions'
import {setMarketLocation, getAllDealershipsForMarket, getMarketYMMTFacet} from '../market/marketActions'
import MarketLocationControl from '../market/MarketLocationControl/MarketLocationControl';
import { es } from 'date-fns/esm/locale';
import DealerListingsTable from '../listings/DealerListingsTable/DealerListingsTable';


const actions = {
    getModelFacetForDealer, getMDSForListing, getTradeSmartForListing, setMarketLocation,getAllInventoryForADealer, getAllDealershipsForMarket,selectDealer,  getAveragePriceForYMM, getPhotosForListing, selectListing,getSimilarInventory,getMarketYMMTFacet
}

const mapState = state =>({
    dealer:state.dealer,
    listing: state.listing,
    market: state.market || {}
})



class MarketDashboard extends Component {


  state={
      _dealer: {},
      _market: {},
      _listing: {},
      _loadMarket:false,
      _loadDealer: false,
      _loadListing:false,
      _makeFilter: {},
      _listingsHaveLoadedFlag: true,
      
  }

  componentWillMount(){
      this.setState({_market:this.props.market})
  }

componentWillReceiveProps = async (nextProps) => {
    if(!_.isEqual(nextProps.dealer,this.state._dealer)){
        console.log('Dealership Changed')
        this.setState({_dealer:nextProps.dealer})
    }

    if(!_.isEqual(nextProps.market,this.state._market)){
        this.setState({_loadMarket:true})
        await this.setState({_market:nextProps.market})
        await this.props.getAllDealershipsForMarket(this.state._market)
        this.setState({_loadMarket:false})
    }

    if(!_.isEqual(nextProps.listing,this.state._listing)){
       
        this.setState({_listing:nextProps.listing})
    }
}



handleUpdateMarketLocation = async (lat, lng, radius) =>{
    this.setState({_loadMarket:true})
    await this.props.setMarketLocation(this.state._market, lat, lng, radius)
    await this.props.getAllDealershipsForMarket(this.state._market)
    this.setState({_loadMarket:false})
}


handleClickOnMake = async (make) =>{
    this.setState({_makeFilter:make})
}

handleSelectListing = async (listing) =>{
    this.setState({_loadListing:true})
    console.log('handleSelectListing Dashboard reached')
     
    await this.props.selectListing(listing)
    await this.props.getSimilarInventory(this.state._dealer, this.state._listing)
    await this.props.getPhotosForListing(this.state._dealer, listing) 
    await this.props.getMDSForListing(this.state._market, listing)
  //  await this.props.getTradeSmartForListing(listing)
    this.setState({_loadListing:false})
}

   handleClickOnDealership = async (dealer) =>{
    this.setState({_loadDealer:true})
    await this.props.selectDealer(dealer)
    //should get inventory for dealer at this point
  
  await this.props.getAllInventoryForADealer(this.state._market, this.state._dealer)
 await this.props.getModelFacetForDealer(this.state._dealer)
    const {_dealer} = this.state || {}
    const {listings} = _dealer || []
    console.log('loop over listings', listings)
    for(var i=0; i<(listings&&listings.length); i++){
        await this.props.getAveragePriceForYMM(_dealer, listings[i])
        //get MDS 
       
    }
  

  this.setState({_loadDealer:false})
}

scrollToMyRef = (eChild, offset) => {
    scrollToComponent(eChild.currentTarget, {
      offset: -110 + offset,
      align: "top",
      duration: 600
    });
  };

  async componentDidMount() {

    // const {_market}  = this.state || {}
    // if(_market)
    // await  this.props.getAllDealershipsForMarket(_market)
    // else
    // console.log('No MArket')
  //  await this.props.getMarketYMMTFacet(_market)
    
  }

    render() {

        //STATE VARIABLES
        const {_makeFilter, _dealer, _market, _listing, _loadDealer, _loadListing, _loadMarket} = this.state || {}
        const {id: selectedDealerID} = _dealer || {}
        //ACTIONS
         const {lat,lng,radius} = _market || {}
        //PROPS

         
        const {listings} = _dealer || {}
        const {dealerships} = _market || []
        return (
         <div style={{height:2000}}>
                 <MarketLocationControl  handleUpdateMarketLocation={this.handleUpdateMarketLocation}/>
            <div style={{ height:400, width:'100%'}}>
            
                <Grid columns={2} centered >
                <Grid.Column  >
                
                <MarketMap  selectedId={selectedDealerID} loading={_loadMarket} lat={lat} lng={lng} radius={radius} dealerships={dealerships} handleClickOnDealership={this.handleClickOnDealership}/>
                
                </Grid.Column>
            <Grid.Column  >

        <DealerProfile
        loading={_loadDealer}
        dealer={_dealer}
        handleClickOnMake = {this.handleClickOnMake}
        makeFilter={_makeFilter}
        loadDealer={_loadDealer}
        />
            </Grid.Column>
                </Grid>
             


            </div>
            <DealerListingsTable 
                        loadDealer={_loadDealer}
                        loadListing={_loadListing}
                        listing={_listing}
                        handleLoadListing={this.handleGatherListingMeta}
                        handleClickSimilarInventory={this.handleSelectListing}
                        dealer={_dealer}
                        scrollToMyRef={this.scrollToMyRef}
                        makeFilter={_makeFilter}
            
            />
          
               {/* <SliderCarousel
               loadSlider={_loadDealer}
        //       loadExpanded={_loadInventory}
               items={listings}
               listing={_listing}
               handleLoadItem={this.handleGatherListingMeta}
               handleClickItem={this.handleSelectListing}
               dealer={_dealer}
                scrollToMyRef={this.scrollToMyRef}
          //     loadItem={_loadInventory}

               ></SliderCarousel> */}
        <div>


        </div>
        </div>
          
        )
    }
}



export default connect(mapState, actions)(MarketDashboard)
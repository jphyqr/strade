import React, { Component } from 'react'
import {connect} from 'react-redux'
import scrollToComponent from "react-scroll-to-component";
import MarketMap from '../market/MarketMap/MarketMap'
import _ from 'lodash'
import Slider from '../listings/SelectedDealerCarousel/Slider/Slider'
import SliderCarousel from '../listings/SelectedDealerCarousel/SliderCarousel'
import { Grid, Button, Radio, Segment } from 'semantic-ui-react';
import DealerProfile from '../dealer/DealerStatCard';

import {getCopyVins, getEMPForVDP, getRemainingInventoryForDealership, getMDSForListing,  getTradeSmartForListing, getSimilarInventory, getInitialInventoryAndMakeFacet, getAveragePriceForYMM, getPhotosForListing, selectListing} from '../listings/listingActions'
import { getDealerInfo,selectDealer,getModelFacetForDealer} from '../dealer/dealerActions'
import {setMarketLocation, getAllDealershipsForMarket, getMarketYMMTFacet} from '../market/marketActions'
import MarketLocationControl from '../market/MarketLocationControl/MarketLocationControl';
import { es } from 'date-fns/esm/locale';
import DealerListingsTable from '../listings/DealerListingsTable/DealerListingsTable';
import PotentialGroupTable from '../group/PotentialGroupTable/PotentialGroupTable';
import { geolocated } from 'react-geolocated';
import { compose } from '../../../../Library/Caches/typescript/3.6/node_modules/redux';
import Geocode from 'react-geocode'
import * as keys from '../../app/config/keys'
import DealerLookupBox from '../common/lookup/LookupBox/DealerLookupBox';

Geocode.setApiKey(keys.googleApiKey);
Geocode.setLanguage("en");
var sMedia = sMedia || {};
const actions = {
  getDealerInfo, getCopyVins, getEMPForVDP, getRemainingInventoryForDealership, getModelFacetForDealer, getMDSForListing, getTradeSmartForListing, setMarketLocation,getInitialInventoryAndMakeFacet, getAllDealershipsForMarket,selectDealer,  getAveragePriceForYMM, getPhotosForListing, selectListing,getSimilarInventory,getMarketYMMTFacet
}

const mapState = state =>({
    dealer:state.dealer,
    listing: state.listing,
    market: state.market || {}
})

const propsAsString =(obj)=> {
    return Object.keys(obj).map(function(k) { return k + ":" + obj[k] }).join(" AND ").toString()
  }

class MarketDashboard extends Component {


  state={
      _dealer: {},
      _owned: true,
      _used:true,
      _market: {},
      _listing: {},
      _radius: 250,
      _loadMarket:false,
      _loadDealer: false,
      _loadListing:false,
      _loadCopyCat:false,
      _loadEMP: false,
      _makeFilter: {},
      _potentialGroups: [],
      _listingsHaveLoadedFlag: true,
      _location: {},
      _lat: {},
      _lng: {},
      _country: "country=ALL",
      _uuid: {}
      
  }
  
   get_smedia_uuid =()=> {
    if (typeof sMedia.XDomainCookie !== 'undefined') {
        console.log("Requesting for uuid and session id");
        sMedia.XDomainCookie.get('smedia_uuid', function(uuid) {
            console.log("sMedia UUID: " + uuid);
            console.log("sMedia Session Id: " + sMedia.Context.Browser.sessionId);
        });
    } else {
        console.log("Waiting for Cookie to load smart offer");
        setTimeout(this.get_smedia_uuid, 1000);
    }
}

  async componentDidMount(){
   

//Read uuid
console.log('SCRIPT', window)
const sfn="//tm.smedia.ca/analytics/script.js"
const sref = document.createElement('script');
sref=document.createElement('script');
sref.setAttribute("type","text/javascript");
sref.setAttribute("src", sfn);
sref.setAttribute("async", "");
document.getElementsByTagName("head")[0].appendChild(sref);


{/* <script type="text/javascript">
  sfn="//tm.smedia.ca/analytics/script.js";
  sref=document.createElement('script');
  sref.setAttribute("type","text/javascript");
  sref.setAttribute("src", sfn);
  sref.setAttribute("async", "");
  document.getElementsByTagName("head")[0].appendChild(sref);
</script> */}

     
  }


  componentDidUpdate = async (prevProps) =>{

    if(!_.isEqual(prevProps.market,this.state._market)){
        await this.setState({_market:prevProps.market})
        
      
     }
  

  
  }


  

componentWillReceiveProps = async (nextProps) => {

     const {coords} = nextProps ||{}
     const {latitude, longitude} = coords || {}





    if(!_.isEqual(nextProps.dealer,this.state._dealer)){
        console.log('Dealership Changed')
        this.setState({_dealer:nextProps.dealer})
    }


    if(!_.isEqual(nextProps.dealer&&nextProps.dealer.listings,this.state._dealer.listings)){
        console.log('Dealership Changed')
        this.setState({_dealer:nextProps.dealer})
    }

    if(!_.isEqual(nextProps.market,this.state._market)){
        this.setState({_loadMarket:true})
        await this.setState({_market:nextProps.market})
        console.log('GADFM 1')

        await this.props.getAllDealershipsForMarket(this.state._country, this.state._market)
        this.setState({_loadMarket:false})
    }

    if(!_.isEqual(nextProps.listing,this.state._listing)){
       
        this.setState({_listing:nextProps.listing})
    }
}



handleUpdateMarketAroundDealer = async (lat, lng, radius, id) =>{
    await this.setState({_loadMarket:true})
    await this.setState({_lat: parseFloat(lat), _lng:parseFloat(lng)})
    console.log ("handleUpdateMarketAroundDealer lat", lat)
    if(this.state._lat&&this.state._lng){
        let location = await  Geocode.fromLatLng(this.state._lat,this.state._lng)

        const {plus_code} =location || {}
        const {compound_code} = plus_code || {}
        let country
        if(compound_code&&compound_code.includes("Canada"))
        country = 'country=CA'
        else if (compound_code&&compound_code.includes("USA"))
        country = 'country=US'
        else
        country = 'country=ALL'
        
        this.setState({_location: location, _country:country})
           
    

    }

    await this.props.setMarketLocation( this.state._market, this.state._lat, this.state._lng, 250, this.state._location, this.state._country)
 await this.props.getAllDealershipsForMarket(this.state._country, this.state._market,)
    await this.setState({_loadMarket:false})


    await this.setState({_loadDealer:true})
    console.log('GADFM 2')
    await this.props.getDealerInfo(id)
  await this.setState({_loadDealer:true})
  await this.props.getInitialInventoryAndMakeFacet(this.state._country, this.state._market, this.state._dealer, this.state._owned, this.state._used)
   
    await this.props.getModelFacetForDealer(this.state._country, this.state._dealer, this.state._owned, this.state._used)
    await this.setState({_loadDealer:false})
   
}

handleUpdateMarketLocationToLocal = async () =>{
  await this.setState({_loadMarket:true})


  const {coords} = this.props || {}
  const {latitude, longitude} = coords || {}
  console.log('CWM ..', latitude)
await this.setState({_lat: latitude, _lng: longitude})


await this.setState({_market:this.props.market})



  if(this.state._lat&&this.state._lng){
      let location = await  Geocode.fromLatLng(this.state._lat,this.state._lng)

      const {plus_code} =location || {}
      const {compound_code} = plus_code || {}
      let country
      if(compound_code&&compound_code.includes("Canada"))
      country = 'country=CA'
      else if (compound_code&&compound_code.includes("USA"))
      country = 'country=US'
      else
      country = 'country=ALL'
      
    await this.setState({_location: location, _country:country})
         
  

  }

  await this.props.setMarketLocation( this.state._market, this.state._lat, this.state._lng, 250, this.state._location, this.state._country)
  console.log('GADFM 2')
  await this.props.getAllDealershipsForMarket(this.state._country, this.state._market,)
  await this.setState({_loadMarket:false})
}



handleLoadEntireInventory = async () =>{
    this.setState({_loadDealer:true})
  await  this.props.getRemainingInventoryForDealership(this.state._country, this.state._market, this.state._dealer, this.state._owned, this.state._used)
  this.setState({_loadDealer:false})
}

handleCopyCat = async () =>{
    const {_dealer} = this.state || {}
    const {listings} = _dealer|| []
    let potentialGroups = []
    await this.setState({_loadCopyCat:true})
    for(var i=0; i<(listings&&listings.length); i++){
       let results =  await  this.props.getCopyVins(this.state._country, this.state._dealer, listings[i])
       console.log('copyCat Results', results)
       
        results&&results.forEach(result =>{
        
       let found = false
            for(var i = 0; i < potentialGroups.length; i++) {
                if (potentialGroups[i].seller_name == result.seller_name) {
                    found = true;
                    break;
                }
            }



              if(!found)
                potentialGroups.push(result)
        })
    }

    console.log({potentialGroups})
    await this.setState({_potentialGroups:potentialGroups})
    
  

    
   await  this.setState({_loadCopyCat:false})
}

handleLoadEMP = async () =>{

  console.log('handleLoadEMP')
  const {_dealer} = this.state || {}
  const {listings} = _dealer|| []
  let potentialGroups = []
  await this.setState({_loadEMP:true, _loadListing:true})
  for(var i=0; i<(listings&&listings.length); i++){
     let results =  await  this.props.getEMPForVDP(this.state._dealer, listings[i])
     console.log('EMP Results', results)
     
 
  }

  console.log({potentialGroups})
  await this.setState({_potentialGroups:potentialGroups})
  


  
 await  this.setState({_loadEMP:false})
}

handleClickOnMake = async (make) =>{
    this.setState({_makeFilter:make})
}

handleSelectListing = async (listing) =>{
    this.setState({_loadListing:true})
    console.log('handleSelectListing Dashboard reached')
     
    await this.props.selectListing(listing)
    await this.props.getSimilarInventory(this.state._country, this.state._dealer, this.state._listing)
    await this.props.getPhotosForListing(this.state._dealer, listing) 
    await this.props.getMDSForListing(this.state._country, this.state._market, listing)
    await this.props.getCopyVins(this.state._country, this.state._dealer, listing)
  //  await this.props.getTradeSmartForListing(listing)
    this.setState({_loadListing:false})
}

   handleClickOnDealership = async (dealer) =>{
    this.setState({_loadDealer:true})
    await this.props.selectDealer(dealer)
    //should get inventory for dealer at this point
  
  await this.props.getInitialInventoryAndMakeFacet(this.state._country, this.state._market, this.state._dealer, this.state._owned, this.state._used)
 await this.props.getModelFacetForDealer(this.state._country, this.state._dealer, this.state._owned, this.state._used)
    const {_dealer} = this.state || {}
    const {listings} = _dealer || []
    console.log('loop over listings', listings)
    for(var i=0; i<(listings&&listings.length); i++){
        await this.props.getAveragePriceForYMM(this.state._country, _dealer, listings[i])
        //get MDS 
       
    }
  

  this.setState({_loadDealer:false, _loadListings:false})
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
        const {_loadEMP, _owned, _used, _country,_location, _makeFilter, _dealer, _lat, _lng, _market, _listing, _loadDealer, _loadListing, _loadMarket, _potentialGroups} = this.state || {}
        const {id: selectedDealerID} = _dealer || {}
        //ACTIONS
         const {lat,lng,radius} = _market || {}
        //PROPS

         
        const {listings} = _dealer || {}
        const {dealerships} = _market || []
        const {coords} = this.props || {}
        const {latitude, longitude} = coords || {}
        this.get_smedia_uuid()

        return (
         <div style={{height:2000}}>
                 {/* <MarketLocationControl  lat={_lat} lng={_lng} handleUpdateMarketLocation={this.handleUpdateMarketLocation}/>  */}
                 <Button onClick={()=>this.handleLoadEntireInventory()}>Load Entire Inventory</Button>
                 <Button loading={this.state._loadCopyCat} onClick={()=>this.handleCopyCat()}>Copy Cat😸</Button>
                 <Button loading={this.state._loadEPM} onClick={()=>this.handleLoadEMP()}>EPM 👀</Button>
                 <DealerLookupBox  handleUpdateMarketAroundDealer={this.handleUpdateMarketAroundDealer}/>
                 <Button primary onClick={()=>this.handleUpdateMarketLocationToLocal()}>Local Market</Button>
               {_country&&
               <span>🌍
             
               <Button.Group>
                   <Button primary={_country.includes("CA")}>🇨🇦</Button>
                   <Button primary={_country.includes("US")}>🇺🇸</Button>
                   <Button primary={_country.includes("ALL")}>🇨🇦🇺🇸</Button>
                 </Button.Group></span>}

                
              <span>🚗<Button.Group>
    <Button primary={!_owned} onClick={()=>this.setState({_owned:!this.state._owned})}>All</Button>
    <Button.Or />
    <Button primary={_owned} onClick={()=>this.setState({_owned:!this.state._owned})}>Owned</Button>
  </Button.Group></span>



                  
  <span>🏷<Button.Group>
    <Button primary={!_used} onClick={()=>this.setState({_used:!this.state._used})}>All</Button>
    <Button.Or />
    <Button primary={_used} onClick={()=>this.setState({_used:!this.state._used})}>Used</Button>
  </Button.Group></span>
                
     
            <div style={{ height:400, width:'100%'}}>
            
                <Grid columns={2} centered >
                <Grid.Column  >
                
            {!(_.isEmpty(_lat)&&_.isEmpty(_lng)&&_.isEmpty(_location))&&   <MarketMap  selectedId={selectedDealerID} loadMarket={_loadMarket} lat={_lat} lng={_lng} radius={250} dealerships={dealerships} handleClickOnDealership={this.handleClickOnDealership}/>}
                
                </Grid.Column>
            <Grid.Column  >

        <DealerProfile
        dealer={_dealer}
        handleClickOnMake = {this.handleClickOnMake}
        makeFilter={_makeFilter}
        loadDealer={_loadDealer}
        loadMarket={_loadMarket}
        
        />
            </Grid.Column>
                </Grid>
             


            </div>



           {_potentialGroups&&_potentialGroups.length>1&&
              <PotentialGroupTable potentialGroups={_potentialGroups}/>
    }

             <DealerListingsTable 
                        loadDealer={_loadDealer}
                        loadListing={_loadListing}
                        listing={_listing}
                        handleLoadListing={this.handleGatherListingMeta}
                        handleSelectListing={this.handleSelectListing}
                        dealer={_dealer}
                        scrollToMyRef={this.scrollToMyRef}
                        makeFilter={_makeFilter}
                        loadEMP={_loadEMP}
            
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




  export default compose(connect(mapState, actions), geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  }))(MarketDashboard)
  
  
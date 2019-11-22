import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import {connect} from 'react-redux'
import {getAllInventoryForADealership} from '../../inventory/listingActions'

const actions = {
  getAllInventoryForADealership
}

const mapState = (state) =>({
  dealerships: state.dealerships
})

class MapMarker extends Component {
  state = { hover: false };


  async  componentDidMount (){

    const GCF_URL = 'https://us-central1-strade-fe535.cloudfunctions.net/getInventoryForDealership'
    const  {dealership} = this.props || {}
    const {id, num_found, facets} = dealership || {}


   // const {  heading, id, media, price, miles, vdp_url,  dom, inventory_type} = item || {}
   // const {photo_links} = media || []
   // const displayPhoto = photo_links[0]

    
   //   const {latitude, longitude} = dealership || {}
  
      
console.log('CDM getting inventory')
  
  await this.props.getAllInventoryForADealership(dealership,this.props.dealerships)
      


      }





  showInfo = () => {
    this.setState({ hover: true });
    this.props.handleMapItemClick(this.props.job.id)
  };

  hideInfo = () => {
    this.setState({ hover: false });
  };

  render() {
    const {
      lat,
      lng,
      key, dealership, selectDealership, handleClickOnDealership
    } = this.props || {};

   const {num_found, facets} = dealership || {}
 
     let circleSize = 5
       if(num_found > 300) 
       circleSize= 7

       if(num_found > 600) 
       circleSize= 9

       if(num_found > 1000) 
       circleSize= 11

    return (
      <div>

        {/* <Icon
          name={categoryIcon}
          inverted
          size={size}
          color="red" //{this.props.hovereddealershipId===this.props.dealership.id? "red" : "blue"}
          lat={lat}
          lng={lng}
          key={key}
          onClick={()=>handleClickOnDealership(dealership)}
     //    onMouseEnter={this.showInfo}
       //   onMouseLeave={this.hideInfo}

        /> */}
     <svg  onClick={()=>handleClickOnDealership(dealership)}>
        <circle     cx={50} cy={50} r={circleSize} fill="red" />
      </svg>

     {this.state.hover&&<Label content={dealership.name} />}
      </div>
    );
  }
}

export default connect(mapState, actions)(MapMarker);

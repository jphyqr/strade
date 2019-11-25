import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import * as keys from '../../../app/config/keys'
import _ from 'lodash'
import { Loader } from 'semantic-ui-react';



class MarketMap extends Component {


state = {
  _dealerships : []
}

componentWillMount(){
  this.setState({_dealerships:this.props.dealerships})
}
componentWillReceiveProps = async (nextProps) => {
  if(!_.isEqual(nextProps.dealerships,this.state._dealerships)){
      console.log('Dealership Changed')
      this.setState({_dealerships:nextProps.dealerships})
  }


}

  render() {

    const {_dealerships} = this.state || []
    const { loading, lat, lng, radius , dealerships, selectedId, handleClickOnDealership} = this.props || {}
    const center = {lat: lat, lng: lng}
    const zoom = 10;

    return (
      <div style={{ height: 400, width: 400 }}>
 {loading? 
<Loader  size='massive'  active />:
        <GoogleMapReact
        //style={{width: "100px", height: "100px"}}
          bootstrapURLKeys={{ key:  keys.googleApiKey }}
          center= {center}
          defaultZoom={zoom}
        //  onChildMouseEnter = {this.onChildMouseEnter}
        //  onChildMouseLeave=  {this.onChildMouseLeave}
        >
          
          {_dealerships&&_dealerships.map((dealer, index)=>(
            
            <MapMarker 
         //   hovereddealershipId={this.props.hovereddealershipId}
          //  handleMapItemClick = {this.props.handleMapItemClick}
            lat={dealer&&dealer.latitude}
            lng={dealer&&dealer.longitude}
            key={index}
            dealer={dealer}
            selectedId={selectedId}
            handleClickOnDealership={handleClickOnDealership}
            
         //   onChildMouseEnter={this.onChildMouseEnter}
         //   onChildMouseLeave= {this.onChildMouseLeave}
            
            />

           
            
          
            
          
           




            
          ))
          
          }


        </GoogleMapReact>}
      </div>
    )
  }
}




export default MarketMap
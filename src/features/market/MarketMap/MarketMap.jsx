import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import * as keys from '../../../app/config/keys'
import _ from 'lodash'
import { Loader } from 'semantic-ui-react';

const apiIsLoaded = (map, maps) => {
  if (map) {
    const bounds = new maps.LatLngBounds();
    map.fitBounds(bounds);
    bindResizeListener(map, maps, bounds);
  }
};

const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

class MarketMap extends Component {


state = {
  _dealerships : [], _lat: {}, _zoom: 11, _lng: {}
}


recenterMap() {
  const map = this.map;
  const {_lat, _lng} = this.state;

  const google = this.props.google;
  const maps = google.maps;

  if (map) {
    let center = new maps.LatLng(_lat, _lng);
    map.panTo(center);
  }
}

componentWillMount(){
  this.setState({_dealerships:this.props.dealerships, _lat: this.props.lat, _lng: this.props.lng})
}

componentDidUpdate = async (prevProps) =>{

  if(!_.isEqual(prevProps.dealerships,this.state._dealerships)){
      await this.setState({_dealerships:prevProps.dealerships})
      
    
   }

  if(prevProps.loadMarket===true&this.props.loadMarket===false){
   //   await this.setState({_dealer:this.props.dealer})
   console.log('DEALERSHIPS LOADED ')
      await this.setState({_dealerships: this.props.dealerships,  _lat:this.props.lat, _lng: this.props.lng})
   //   this.recenterMap()
   
    }


   

}

_onChange = (e) => {
  console.log('map _onChange', e)
  // this.setState({
  //   _center: center,
  //   _zoom: zoom,      
  // });
}



// componentWillReceiveProps = async (nextProps) => {
//   if(!_.isEqual(nextProps.dealerships,this.state._dealerships)){
//       console.log('MarketMap CWRP new dealerships')
//       this.setState({_dealerships:nextProps.dealerships, _lat:nextProps.lat, _lng:nextProps.lng})
//   }

//   if(!_.isEqual(nextProps.lat,this.state._lat)){
//     console.log('NEW LAT')
//     this.setState({_lat:nextProps.lat, _lng:nextProps.lng })
//     this.forceUpdate()
// }


// }

  render() {

    const {_dealerships, } = this.state || []
    const {_lat, _lng, _zoom} = this.state || {}
    const { loadMarket, lat, lng, radius , dealerships, selectedId, handleClickOnDealership} = this.props || {}
    const center = {lat: _lat, lng: _lng}
    const zoom = 5;

    return (
      <div ref="map" style={{ height: 400, width: 400 }}>
 { loadMarket ? 
<Loader  size='massive'  active />:
        <GoogleMapReact
    //    style={{width: "100px", height: "100px"}}
          bootstrapURLKeys={{ key:  keys.googleApiKey }}
          center= {{lat:_lat, lng:_lng}}
         // defaultCenter = {[_lat, _lng]}
        // defaultZoom={_zoom}
          onChange={e=>this._onChange(e)}
          zoom={_zoom}
        //  onChildMouseEnter = {this.onChildMouseEnter}
        //  onChildMouseLeave=  {this.onChildMouseLeave}

      //  yesIWantToUseGoogleMapApiInternals
      //  onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
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


        </GoogleMapReact>
    
      
      }
      </div>
    )
  }
}




export default MarketMap
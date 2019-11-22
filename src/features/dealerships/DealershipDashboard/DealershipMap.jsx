import React from 'react'
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import * as keys from '../../../app/config/keys'



const DealershipMap = (props) => {

    const { lat, lng, radius , dealerships, handleClickOnDealership} = props || {}
   

    const center = {lat: lat, lng: lng}
    const zoom = 10;
    
    return (
        <div style={{ height: 400, width: 400 }}>
        <GoogleMapReact
        //style={{width: "100px", height: "100px"}}
          bootstrapURLKeys={{ key:  keys.googleApiKey }}
          center= {center}
          defaultZoom={zoom}
        //  onChildMouseEnter = {this.onChildMouseEnter}
        //  onChildMouseLeave=  {this.onChildMouseLeave}
        >
          
          {dealerships&&dealerships.map((dealership, index)=>(
            
            <MapMarker 
         //   hovereddealershipId={this.props.hovereddealershipId}
          //  handleMapItemClick = {this.props.handleMapItemClick}
            lat={dealership&&dealership.latitude}
            lng={dealership&&dealership.longitude}
            key={index}
            dealership={dealership}
            handleClickOnDealership={handleClickOnDealership}
            
         //   onChildMouseEnter={this.onChildMouseEnter}
         //   onChildMouseLeave= {this.onChildMouseLeave}
            
            />

           
            
          
            
          
           




            
          ))}


        </GoogleMapReact>
      </div>
    )
}


export default DealershipMap
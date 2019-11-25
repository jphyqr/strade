import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";

class MapMarker extends Component {
  state = { _hovered: false };

  async componentDidMount() {
    const GCF_URL =
      "https://us-central1-strade-fe535.cloudfunctions.net/getInventoryForDealership";
    const { dealer } = this.props || {};
    const { id, num_found, facets } = dealer || {};

    // const {  heading, id, media, price, miles, vdp_url,  dom, inventory_type} = item || {}
    // const {photo_links} = media || []
    // const displayPhoto = photo_links[0]

    //   const {latitude, longitude} = dealer || {}

    console.log("CDM GET INVENTORY inventory");

    //await this.props.getAllInventoryForDealer(dealer)
  }

  showInfo = () => {
    this.setState({ hover: true });
    this.props.handleMapItemClick(this.props.job.id);
  };

  hideInfo = () => {
    this.setState({ hover: false });
  };

  render() {
    const {_hovered} = this.state || false
    const { lat, lng, key, dealer, handleClickOnDealership, selectedId } = this.props || {};

    const { num_found, facets, inventoryCount } = dealer || {};

    let circleSize = 5;
    if (inventoryCount > 300) circleSize = 7;

    if (inventoryCount > 600) circleSize = 9;

    if (inventoryCount > 1000) circleSize = 11;

    const diameter = 2*circleSize

    return (
      <div>
        {/* <Icon
          name={categoryIcon}
          inverted
          size={size}
          color="red" //{this.props.hovereddealershipId===this.props.dealer.id? "red" : "blue"}
          lat={lat}
          lng={lng}
          key={key}
          onClick={()=>handleClickOnDealership(dealer)}
     //    onMouseEnter={this.showInfo}
       //   onMouseLeave={this.hideInfo}

        /> */}
        <svg
          style={{  height: '70', width:'70' ,opacity: _hovered ? 1 : 0.6}}
          onMouseEnter={() => this.setState({ _hovered: true })}
          onMouseLeave={() => this.setState({ _hovered: false })}
         
      //   height={100}
      //    width={100}
          onClick={() => handleClickOnDealership(dealer)}
        >
          <circle
           cx={50}
            cy={50}
              
            r={circleSize}
            fill= {dealer.id==selectedId?'green':'red'} 
          />
        </svg>

      </div>
    );
  }
}

export default MapMarker;

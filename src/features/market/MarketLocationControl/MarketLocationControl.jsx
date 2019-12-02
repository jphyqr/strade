import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import _ from 'lodash'
class MarketLocationControl extends Component {

    state={
        _lat:{},
        _lng:{},
        _radius:250,
    }

    async componentWillMount(){
         const {lat, lng} = this.props || {}
       await  this.setState({_lat:lat, _lng:lng})
    //     const {_radius} = this.state || {}

    //     this.props.handleUpdateMarketLocation(lat, lng, _radius)
    
    }


 componentWillReceiveProps = async (nextProps)  => {


    if(!_.isEqual(nextProps.lat,this.state._lat)){
      
        this.setState({_lat:nextProps.lat, _lng:nextProps.lng})
    }



 }

    render() {

        const {_radius, _lat, _lng} = this.state || {}
        const {handleUpdateMarketLocation, lat, lng} = this.props || {}
        return (
            <span style = {{}}>
                <Input label='LAT' value={_lat} onChange={e=>this.setState({
                    _lat: e.target.value
                })} />
                <Input label='LNG' value={_lng} onChange={e=>this.setState({
                    _lng: e.target.value
                })}/>
                <Input label='RADIUS' value={_radius} onChange={e=>this.setState({
                    _radius: e.target.value
                })}/>
                <Button primary  onClick={()=>handleUpdateMarketLocation(_lat, _lng, _radius)}>Update</Button>
            </span>
        )
    }
}



export default MarketLocationControl
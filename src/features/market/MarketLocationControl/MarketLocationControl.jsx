import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

class MarketLocationControl extends Component {

    state={
        _lat:39.7684,
        _lng:-86.1581,
        _radius:250,
    }

    componentWillMount(){
        const {_lat, _lng, _radius} = this.state || {}
        this.props.handleUpdateMarketLocation(_lat, _lng, _radius)
    }

    render() {

        const {_lat, _lng, _radius} = this.state || {}
        const {handleUpdateMarketLocation} = this.props || {}
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
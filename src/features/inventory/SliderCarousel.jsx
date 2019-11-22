import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from './Slider'
import { Transition } from 'semantic-ui-react'
import ExpandedItem from './ExpandedItem'
import _ from 'lodash'
 class SliderCarousel extends Component {


   state= {
       _expanded : false,
       _expandedLoad : false,
       _dealership: {}

   }


   componentWillReceiveProps = (nextProps) => {
    if(!_.isEqual(nextProps.dealership,this.state._dealership)){
        console.log('Dealership Changed Carousel')
        this.setState({_dealership:nextProps.dealership})
    }

   
}

    shivClick = async (listing) =>{
     await   this.setState({_expandedLoad:true})
        console.log('handleSelectListing carousel shiv')
  
     await   this.props.handleClickItem(listing)

      await  this.setState({_expanded:true})
      await   this.setState({_expandedLoad:false})
    }


    handleShrink = () => {
        //lockInHober
        this.setState({ _expanded: false});
      };

    render() {
   
        const {_expanded, _expandedLoad, _dealership} = this.state || false
        const {listing, handleLoadItem, dealership} = this.props ||{}
        const {items} = this.props || []

        return (
            <div style={{marginTop:30}}>
                   <Slider
               items={items}
               listing={listing}
               handleLoadItem ={handleLoadItem}
               dealership = {_dealership}
               handleClickItem={this.shivClick}
               expanded={_expanded}
               scrollToMyRef={this.props.scrollToMyRef}
               ></Slider>

<Transition.Group animation="scale" duration={400}>
              {(this.state._expanded || this.state._expandedLoad) && (
                <ExpandedItem
                  loading={_expandedLoad}
                  listing={listing}
                  scrollToMyRef={this.props.scrollToMyRef}
                  handleShrink={this.handleShrink}
                />
              )}
            </Transition.Group>
            </div>
        )
    }
}


export default (SliderCarousel)
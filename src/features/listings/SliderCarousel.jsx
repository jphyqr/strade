import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from './SelectedDealerInventory/Slider'
import { Transition } from 'semantic-ui-react'
import ExpandedItem from './SelectedDealerInventory/ExpandedItem'
import _ from 'lodash'
 class SliderCarousel extends Component {


   state= {
       _expanded : false,
       _expandedLoad : false,
       _dealer: {}

   }


   componentWillReceiveProps = (nextProps) => {
    if(!_.isEqual(nextProps.dealer,this.state._dealer)){
        console.log('Dealership Changed Carousel')
        this.setState({_dealer:nextProps.dealer})
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
   
        const {_expanded, _expandedLoad, _dealer} = this.state || false
        const {listing, handleLoadItem, dealer} = this.props ||{}
        const {items} = this.props || []

        return (
            <div style={{marginTop:30}}>
                   <Slider
               items={items}
               listing={listing}
               handleLoadItem ={handleLoadItem}
               dealer = {_dealer}
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
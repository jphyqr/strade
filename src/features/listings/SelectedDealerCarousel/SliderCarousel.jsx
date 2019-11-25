import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from './Slider/Slider'
import { Transition } from 'semantic-ui-react'
import ExpandedItem from './Expanded/ExpandedItem'
import _ from 'lodash'
import ContentLoader from 'react-content-loader'
import * as screenConstants from '../../../app/common/constants'
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


      renderPlaceholder = () => {


        const compactDisplayMode = false
      
        return (
          <div
            style={{
              display: "inline-block",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              backgroundColor: "grey",
              height: compactDisplayMode
                ? screenConstants.COMPACT_ITEM_HEIGHT
                : screenConstants.REGULAR_ITEM_HEIGHT, // this.state.hovered ? 200 : 150,
              width: compactDisplayMode ? screenConstants.COMPACT_ITEM_WIDTH : screenConstants.REGULAR_ITEM_WIDTH,
              marginLeft: 5,
              marginBottom: 0,
              opacity: 0.4,
              boxSizing: "border-box"
            }}
          >
            <ContentLoader
              height={
                compactDisplayMode ? screenConstants.COMPACT_ITEM_HEIGHT : screenConstants.REGULAR_ITEM_HEIGHT
              } // this.state.hovered ? 200 : 150,
              width={compactDisplayMode ? screenConstants.COMPACT_ITEM_WIDTH : screenConstants.REGULAR_ITEM_WIDTH}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#d3d2d4"
            >
              <rect x="79" y="9" rx="5" ry="5" width="157" height="17" />
              <rect x="83" y="51" rx="5" ry="5" width="148" height="28" />
              <rect x="-6" y="136" rx="5" ry="5" width="312" height="18" />
            </ContentLoader>
          </div>
        );
      };
    

    render() {
   
        const {_expanded, _expandedLoad, _dealer} = this.state || false
        const {listing, handleLoadItem, dealer, loadSlider, loadExpanded, loadItem} = this.props ||{}
   
        const {listings} = _dealer || []
      const compactDisplayMode = false;
        return (
            <div style={{marginTop:30}}>


{loadSlider ?     <div
            class="list"
            style={{
              height: compactDisplayMode
                ? screenConstants.COMPACT_ITEM_HEIGHT + 10
                : screenConstants.REGULAR_ITEM_HEIGHT + 10,
              marginBottom: 0,
              width: "100%",
              paddingTop: 0,
              transition: "0.15s all ease",
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              position: "relative",
              verticalAlign: "middle"
            }}
          >
            {_.times(8, () => this.renderPlaceholder())}
          </div> : 

                   <Slider
               items={listings}
               listing={listing}
               handleLoadItem ={handleLoadItem}
               dealer = {_dealer}
               handleClickItem={this.shivClick}
               expanded={_expanded}
               scrollToMyRef={this.props.scrollToMyRef}
               loadSlider={loadSlider}
               loadItem={loadItem}
               ></Slider>}

<Transition.Group animation="scale" duration={400}>
              {(this.state._expanded || this.state._expandedLoad) && (
                <ExpandedItem
                  loading={loadExpanded}
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
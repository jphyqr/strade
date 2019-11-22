import React, { Component } from 'react'
import {Icon} from 'semantic-ui-react'
import moment from 'moment'
import format from 'date-fns/format'
import axios from 'axios'
import * as screenConstants from '../../app/common/constants'

import _ from 'lodash'
import { Link } from 'react-router-dom'

 class SliderItem extends Component {

  state = {
   _item:{}, new: false, id:"",  hovered: false, isSelected: false, averagePriceYMM: 0, photoURL: ""
  }




   componentDidMount() {
     this.setState({_item:this.props.item, photoURL:this.props.item.media.photo_links[0]})

   }

    componentWillReceiveProps= async (nextProps)=>{

      if(!_.isEqual(nextProps.item,this.state._item)){
        console.log('item new props')
       await this.setState({_item:nextProps.item, photoURL:nextProps.item.media.photo_links[0]})
       
       await this.props.handleLoadItem(this.state._item)
   
      }


      }
    

      onMouseEnterHandler = () => {
        if (!this.props.lockHover)
          this.setState({
            _hovered: true
          });
    
       
      };
      onMouseLeaveHandler = () => {
        this.setState({
          _hovered: false
        });
    
      };





    
    
  //   onMouseEnterHandler = () => {
  //       this.props.handleHoverJob(true, this.props.job.id)
  //       this.setState({hovered:true})
  //   }
  //   onMouseLeaveHandler = () => {
  //     this.props.handleHoverJob(false, this.props.job.id)
  //     this.setState({hovered:false})
  // }

    clickShiv=(e,item)=>{
        this.props.handleClickItem(item)


        if (!this.props._expanded) {
          this.props.scrollToMyRef(e, 0);
        }
    }

    render() {

      const {averagePriceYMM, photoURL, _item, _hovered} = this.state || {}

        const {compactDisplayMode, index} = this.props || {}
        const {heading, id, media, price, miles, vdp_url,  dom, inventory_type,medianPriceInLocal, meanPriceInLocal, photo_url} = _item || {}
      
        const {photo_links} = media || []
        const displayPhoto = photo_links&&photo_links[0] || ""

     let marketPosition = ((price-meanPriceInLocal)/price)*100
     console.log({marketPosition})
   let marketPositionString
   
     let marketPositionInt = parseInt(marketPosition)
     console.log({marketPositionInt})
    if(marketPositionInt>0){
      marketPositionString = `+${marketPositionInt.toString()}`
    } else
       marketPositionString = marketPositionInt.toString()
     
     
      return (
      //  <a rel="noopener noreferrer" href={vdp_url} target="_blank">
        <div
        ref={index}
        className="ui  image"
       onMouseEnter={this.onMouseEnterHandler}
       onMouseLeave={this.onMouseLeaveHandler}
       onClick={e => this.clickShiv(e, _item)}
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          display: "inline-block",
          height: compactDisplayMode ? screenConstants.COMPACT_ITEM_HEIGHT:screenConstants.REGULAR_ITEM_HEIGHT , // this.state.hovered ? 200 : 150,
          width: compactDisplayMode ? screenConstants.COMPACT_ITEM_WIDTH:screenConstants.REGULAR_ITEM_WIDTH ,
          marginLeft: 5,
          opacity: (this.state._hovered||this.state.isSelected) ? 1 : 0.8,
          
          // transition: "opacity 1500ms, height 1500ms , width 1500ms ",
          //   transform: this.state._hovered ? "scaleY(1.5)" : this.props.scrollRightClicked ? "translateX(-500%)" : "scaleY(1)" ,
          //transform: this.state.clicked ? "translateX(-100%)" : "translateX(0%)",
          // transformOrigin: "50% 50%",
          boxSizing: "border-box",
          transition: "0.15s all ease",
          //  transitionDelay: "100ms"
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            padding: 0
          }}
        >
          <img
            style={{
              height: compactDisplayMode ? screenConstants.COMPACT_ITEM_HEIGHT:screenConstants.REGULAR_ITEM_HEIGHT , // this.state._hovered ? 200 : 150,
              width: compactDisplayMode ? screenConstants.COMPACT_ITEM_WIDTH:screenConstants.REGULAR_ITEM_WIDTH ,
              //    left:this.state._hovered ? 50 : 0,
              opacity: (this.state._hovered||this.state.isSelected)  ? 1 : 0.8,
              //    transition: "opacity 1500ms , height 1500ms , width 1500ms ",
              //      transform: this.state._hovered?"scale(1.5)":"scale(1)",
              //    transformOrigin: "50% 50%",
              transition: "0.15s all ease"
            }}
            src={photo_url||""}
          />
        </div>
        <div
          style={{
                backgroundColor: "black",
            color: "white",
            fontSize: 12,
            position: "absolute",
            bottom: "0",

            //right: "100",
            textAlign: "center",
            width: "100%",
            height: "auto",


            textOverflow: "ellipsis",
            whiteSpace: compactDisplayMode? "normal" : "nowrap",
            overflow: "hidden"
          }}
        >
         {heading}
        </div>

        <div
            style={{
              position: "absolute",
              top: "5%",
            
              opacity: (this.state._hovered||this.state.isSelected)  ? 1 : 0.8,
              color: marketPosition>5?"red":marketPosition<(-5)?"blue":"green" ,
             // background:"white",
              textAlign: "right",
              width: "100%",
              height: "auto",
              textOverflow: "ellipsis",
              fontSize:30,
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            {marketPositionString}
          </div>

        <div
          style={{
            //     backgroundColor: "black",
            color: "white",
            fontSize: 18,
            position: "absolute",
            bottom: 20,
            textAlign: "center",
            width: "100%",
            opacity: (this.state._hovered||this.state.isSelected) ? 0.8 : 0,
            zIndex:1000,
            height: "auto"
          }}
        >
          <Icon color="white" size="huge" name="arrow down" />
        </div>











        <div
          style={{
            position: "absolute",
            top: 30,
            right: 5,
            color: "white",
            zIndex: 5
          }}
        >
          {/* {item.managerUid === auth.uid ? (
            <Button
              loading={isLoading}
              onClick={() => this.editTask(item)}
            >
              edit task
            </Button>
          ) : isSubscribed ? (
            <Button icon
            circular
            style={{opacity: 0.6,
            
              boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }
          
          }
            size="large"
            color="white"
              loading={this.props.subscribeButtonLoading&&this.state.isSelected}
              onClick={() => this.props.handleUnsubscribe(item)}
            >
              <Icon size="large" name="deaf"/>
            </Button>
          ) : (
            <Button
            icon
            circular
            size="large"
              loading={this.props.subscribeButtonLoading&&this.state.isSelected}
              onClick={() => this.props.handleSubscribe(item)}
              inverted
            color="white"
              style={{opacity: 1,
                boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              
              }}
            >
            <Icon size="large" name="assistive listening systems"/>
            </Button>
          )} */}
        </div>
      </div>
    //  </a>
      )
    }
}


export default (SliderItem)

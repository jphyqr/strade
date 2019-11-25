import React, { Component } from "react";
import InsideItem from "./SelectedDealerInventory/InsideItem";
class InsideSlider extends Component {

state = {
    _items: []
}
    componentDidMount(){
        const {items} = this.props || []
    //    const _items = items&&objectToArray(items); 

        this.setState({_items: items})
    }

  render() {
      const {_items,} = this.state
      const {compactDisplayMode} = this.props
      console.log({_items})
    return (
      <div
        class="list"
      //  onMouseEnter={this.props.onMouseEnterHandler}
      //  onMouseLeave={this.props.onMouseLeaveHandler}
        style={{
          height: compactDisplayMode? 110: 160,
          marginBottom: 1,
          width: "100vw",
        // backgroundColor: "grey",
          paddingTop: 0,
          //   paddingLeft: this.props.childIsExpanding&&!this.props.showExpanded ? 0 : 30,
          transition: "0.15s all ease",
         // overflow: "scroll",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          top:"10",
          verticalAlign: "middle",
        }}
      >
        {_items &&
          _items.map((item, i) => (
            <InsideItem
              index={i}
            //  category={this.props.category}
              item={item}
              compactDisplayMode={false}
            //   scrollRightClicked={this.state.scrollRightClicked}
            //   scrollToMyRef={this.props.scrollToMyRef}
            //   showExpanded={this.props.showExpanded}
            //   handleShowExpanded={this.props.handleShowExpanded}
            //   toggleLockInHover={this.props.toggleLockInHover}
            //   lockHover={this.props.lockInHover}
            //   handleChildExpanding={this.props.handleChildExpanding}
            //   handleChildCompressing={this.props.handleChildCompressing}
            //   handleSubscribe={this.props.handleSubscribe}
            //   handleUnsubscribe={this.props.handleUnsubscribe}
            //   auth={this.props.auth}
            //   loading={this.props.loading}
            //   selectedJobId={this.props.selectedJobId}
            //   subscribeButtonLoading={this.props.subscribeButtonLoading}
            />
          ))}
      </div>
    );
  }
}

export default InsideSlider;

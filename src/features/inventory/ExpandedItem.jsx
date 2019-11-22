import React, { Component } from 'react'
import { Dimmer, Loader, Button, Icon , Statistic, Image} from 'semantic-ui-react';

 class ExpandedItem extends Component {

    state = { 
        _selectedTab: "overview"
    }

    render() {
        const {_selectedTab} = this.state || {}
        const {loading, listing, handleShrink} = this.props || {}
 
        const {photo_url, heading, id, price, vdp_url, dom, inventory_type, meanPriceInLocal, medianPriceInLocal } = listing || {}

        const compactDisplayMode = false
        return (
            <div
            container
            style={{
              height: compactDisplayMode ? 350 : 475,
              width: "100%",
              backgroundColor: "black",
              position: "relative"
            }}
          >
            {this.props.expandedLoading ? (
              <Dimmer active>
                <Loader />
              </Dimmer>
            ) : (
              <div>
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    width: compactDisplayMode ? "100%" : "85%",
                    height: compactDisplayMode ? 350 : 475,
    
                    background: `url(${photo_url}) center center no-repeat `,
                    backgroundSize: "cover"
                  }}
                />
    
                <div
                  style={{
                    height: compactDisplayMode ? 350 : 475,
                    position: "absolute",
                    width: compactDisplayMode ? "100%" : "85%",
                    right: 0,
                    //   maxWidth: "85%",
                    backgroundImage: compactDisplayMode
                      ? "linear-gradient(to bottom, rgba(255,255,255, 0) 0%, rgba(0,0,0, 1) 100%)"
                      : "linear-gradient(to left, rgba(255,255,255, 0) 0%, rgba(0,0,0, 1) 100%)"
                    //  zIndex: "5"
                  }}
                />
                <div style={{ zIndex: "5" }}>
                  <p
                    style={{
                      cursor: "pointer",
                      color: "white",
                      zIndex: "5",
                      position: "absolute",
                      right: "0",
    
                      fontSize: compactDisplayMode ? 30 : 40,
                      marginRight: compactDisplayMode ? "15px": "25px",
                      marginTop: compactDisplayMode? "10px": "15px",
                      textAlign: "right"
                    }}
                    onClick={() => {
                      this.props.handleShrink();
                    }}
                  >
                    X
                  </p>
    

                  <div
                    className="priceStats"
                    style={{
                      position: "absolute",
                      fontSize: 50,
                      top: "20px",
                      color: "white",
                      height: 100,
                      width: "auto",
                      left: "10px",
                      zIndex: 100
                    }}
                  >




                  </div>

                  <div
                      className="description"
                      style={{
                        position: "absolute",
                        fontSize: 30,
                        top: "5%",
                        color: "green",
                        height: 100,
                        width: "auto",
                        left: "50px",
                        zIndex: "5"
                      }}
                    >
                      {" "}
                     {price}
                    
                    </div>
                    <div
                      className="description"
                      style={{
                        position: "absolute",
                        fontSize: 20,
                        top: "15%",
                        color: "green",
                        height: 100,
                        width: "auto",
                        left: "50px",
                        zIndex: "5"
                      }}
                    >
                      
                     Price
                    
                    </div>



                    <div
                      className="description"
                      style={{
                        position: "absolute",
                        fontSize: 30,
                        top: "5%",
                        color: "grey",
                        height: 100,
                        width: "auto",
                        left: "200px",
                        zIndex: "5"
                      }}
                    >
                      {" "}
                     {meanPriceInLocal}
                    
                    </div>
                    <div
                      className="description"
                      style={{
                        position: "absolute",
                        fontSize: 20,
                        top: "15%",
                        color: "grey",
                        height: 100,
                        width: "auto",
                        left: "200px",
                        zIndex: "5"
                      }}
                    >
                      
                     Average In Market
                    
                    </div>


                  {_selectedTab === "overview" && (
                    <div
                      className="description"
                      style={{
                        position: "absolute",
                        fontSize: 30,
                        top: "50%",
                        color: "white",
                        height: 100,
                        width: "auto",
                        left: "50px",
                        zIndex: "5"
                      }}
                    >
                      {" "}
                      <p>{heading}</p>
                    </div>

                 
                  )}
    
                  <div
                    className="actionButton"
                    style={{
                      position: "absolute",
                      fontSize: 30,
                      top: "75%",
                      color: "white",
                      height: 100,
                      width: "auto",
                      left: "50px",
                      zIndex: "5"
                    }}
                  >
                    {" "}
                    {/* <button
                  onClick={this.handleBookClick}
                  style={{
                    width: 200,
                    cursor: "pointer",
                    color: "white",
                    borderColor: "red",
                    backgroundColor: this.state.isLoading ? "yellow" : "red"
                  }}
                >
                  Book
                </button> */}
                   <Button
                      icon
                      size={compactDisplayMode ? "small" : "huge"}
                      labelPosition="left"
                      positive
                      onClick={this.handleBookClick}
                      color="white"
                      loading={this.state.isLoading}
                    >
                      <Icon name="add" />
                      Book Job
                    </Button>
             
                  </div>
    
                  {_selectedTab === "contractors" && (
                    <div>
                      {/* <div
                  className="contractors"
                  style={{
                    position: "absolute",
                    fontSize: 30,
                    top: "50%",
                    color: "white",
                    backgroundColor: "grey",
                    height: 100,
                    width: "auto",
                    left: "50px",
                    zIndex: "5"
                  }}
                >
                  {" "}
                  <p>Contractors Content</p>
                </div> */}
                      <div
                        className="contractors"
                        style={{
                          position: "absolute",
                          fontSize: 30,
                          top: "33%",
                          color: "white",
                          //     backgroundColor: "grey",
    
                          //   height: 100,
                          //  width: "auto",
                          left: "0",
                          zIndex: "5"
                        }}
                      >
                        {" "}
                        
                        {/* <ContractorSlider
                          compactDisplayMode={compactDisplayMode}
                          items={this.state.currentJob.subscribers}
                        /> */}
                      </div>
                    </div>
                  )}
    
                  {_selectedTab === "supplies" && (
                    <div
                      className="contractors"
                      style={{
                        position: "absolute",
                        fontSize: 30,
                        top: "50%",
                        color: "white",
                        height: 100,
                        width: "auto",
                        left: "50px",
                        zIndex: "5"
                      }}
                    >
                      {" "}
                      <p>Supplies Content</p>
                    </div>
                  )}
    
                  {_selectedTab === "tips" && (
                    <div
                      className="contractors"
                      style={{
                        position: "absolute",
                        fontSize: 30,
                        top: "50%",
                        color: "white",
                        height: 100,
                        width: "auto",
                        left: "50px",
                        zIndex: "5"
                      }}
                    >
                      {" "}
                      <p>Tips Content</p>
                    </div>
                  )}
    

    
                  <div
                    style={{
                      position: "absolute",
                      fontSize: 20,
    
                      bottom: 0,
                      left: 0,//compactDisplayMode ? 0 : "50%",
                      marginLeft: 0,// compactDisplayMode ? "0" : "-170px",
                      width: compactDisplayMode ? "100%" : "100%",
                      zIndex: "5"
                    }}
                  >
                    {/* <BuildExpandedNavBar
                      selectedTab={_selectedTab}
                      handleSelectTab={this.handleSelectTab}
                      compactDisplayMode={compactDisplayMode}
                    /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
    }
}


export default ExpandedItem
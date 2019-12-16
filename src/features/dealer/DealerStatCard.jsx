import React, { Component } from 'react'
import _ from 'lodash'
import CanvasJSReact from '../../assets/canvasjs.react';
import { Loader, Dimmer, Button } from 'semantic-ui-react';
import { objectToArray } from '../../app/common/util/helpers';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const visitorsDrilldownedChartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisY: {
        gridThickness: 0,
        includeZero: false,
        lineThickness: 1
    },
    data: []
};





class DealerStatCard extends Component {



state = {
    _dealer : {}, onRef: {},

    _showBackButton: false, _makeFilter: {},     _filteredListings : [], _listings : [], _modelOptions:[]
}





handleClickBackOnFilter = async () => {
    await this.props.handleClickOnMake()
    this.setState({_showBackButton:false})

}

  handleClickMake = async (e) =>{
      console.log('drill down', e)
   // console.log('handleClickMake', e.dataPoint.indexLabel)
  await this.props.handleClickOnMake(e.dataPoint.indexLabel)
  this.setState({_showBackButton:true})

  const {_modelOptions} = this.state || {}

  var chart = this.chart;
  chart.options = visitorsDrilldownedChartOptions;
  chart.options.data =  [{
    click: (e)=>this.handleClickMake(e),
    type: "column", //change type to bar, line, area, pie, etc
    //indexLabel: "{y}", //Shows y value on all Data Points
    indexLabelFontColor: "#5A5757",
    indexLabelPlacement: "outside",
    indexLabelOrientation: "vertical",
    dataPoints: _modelOptions
}]
  chart.options.title = { text: e.dataPoint.indexLabel }
  chart.render();


  }








    componentWillReceiveProps = async (nextProps) => {
        if(!_.isEqual(nextProps.dealer,this.state._dealer)){
          console.log('dealer profile Dealership Changed')
            this.setState({_dealer:nextProps.dealer})
       //     this.chart.render()
        }


        
    if(!_.isEqual(nextProps.dealer&&nextProps.dealer.listings,this.state._listings)){
        console.log('New Listings Changed')
        this.setState({_listings:nextProps.dealer.listings})
    }

        if(!_.isEqual(nextProps.makeFilter,this.state._makeFilter)){
            await   this.setState({_makeFilter:nextProps.makeFilter})
   
            let filteredListings
           if((this.state._makeFilter)){
           console.log('Filter not empty', this.state._makeFilter)
           filteredListings  = this.state._listings.filter(listing => listing.build.make==this.state._makeFilter)
            } else
           {
               console.log('filter is empty', this.state._makeFilter)
               filteredListings = this.state._listings
           }
        
   
           console.log('filtered list to:', filteredListings)
            this.setState({_filteredListings:filteredListings})
           
           
            //loop through listings, build model facet
            let modelFacet = {}
            const {_filteredListings} = this.state || []
            console.log('..looping through filteredList', _filteredListings)
          _filteredListings.forEach(listing =>{
              console.log('looping item', listing)
            const {build} = listing || {}
            const {make, model} = build || {}
             console.log('int of facet', modelFacet[`${model}`])
             if(modelFacet[`${model}`]==undefined)
             modelFacet[`${model}`] = 1
             else
             modelFacet[`${model}`]= modelFacet[`${model}`]+1
          })
          
            console.log({modelFacet})
   
           
            console.log('Array of facets',  objectToArray(modelFacet))

            let modelFacetArray = objectToArray(modelFacet)
            let modelDataPoints = []
            modelFacetArray.forEach((model, i)=>{
              

              
               console.log('model', {model})
               console.log('model value', model.value)
               console.log('model parse Int', parseInt(model))
                    modelDataPoints.push({x:i, y:parseInt(model), indexLabel:model.id})
               
        



            })

            console.log({modelDataPoints})
            this.setState({_modelOptions:modelDataPoints})
        }

    }

  componentDidUpdate= async (prevProps) =>{
    if(prevProps.loadDealer===true&this.props.loadDealer===false){
          await this.setState({_dealer:this.props.dealer})
        console.log('DEALER STAT CARD DEALER HAS CHANGED AND LOADED', this.state._dealer)
           const {listings} = this.state._dealer || []


           console.log('DEALER STAT CARD  should be setting filteredlistings to', listings)
           await this.setState({_filteredListings: listings, _listings: listings})
        }
   

        if(prevProps.loadMarket===true&this.props.loadMarket===false){
            await this.setState({_dealer:this.props.dealer})
          console.log('DEALER STAT CARD DEALER HAS CHANGED AND LOADED', this.state._dealer)
             const {listings} = this.state._dealer || []
  
  
             console.log('DEALER STAT CARD  should be setting filteredlistings to', listings)
             await this.setState({_filteredListings: listings, _listings: listings})
          }

 }




    render() {


        this.options = {
			"New vs Returning Visitors": [{
				click: this.visitorsChartDrilldownHandler,
				cursor: "pointer",
				explodeOnClick: false,
				innerRadius: "75%",
				legendMarkerType: "square",
				name: "New vs Returning Visitors",
				radius: "100%",
				showInLegend: true,
				startAngle: 90,
				type: "doughnut",
				dataPoints: [
					{ y: 522460, name: "New Visitors", color: "#E7823A" },
					{ y: 307040, name: "Returning Visitors", color: "#546BC1" }
				]
			}],
			"New Visitors": [{
				color: "#E7823A",
				name: "New Visitors",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2017"), y: 37000 },
					{ x: new Date("1 Feb 2017"), y: 39960 },
					{ x: new Date("1 Mar 2017"), y: 41160 },
					{ x: new Date("1 Apr 2017"), y: 42240 },
					{ x: new Date("1 May 2017"), y: 42200 },
					{ x: new Date("1 Jun 2017"), y: 43600 },
					{ x: new Date("1 Jul 2017"), y: 45560 },
					{ x: new Date("1 Aug 2017"), y: 47280 },
					{ x: new Date("1 Sep 2017"), y: 48800 },
					{ x: new Date("1 Oct 2017"), y: 52720 },
					{ x: new Date("1 Nov 2017"), y: 56840 },
					{ x: new Date("1 Dec 2017"), y: 58400 }
				]
			}],
			"Returning Visitors": [{
				color: "#546BC1",
				name: "Returning Visitors",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2017"), y: 19000 },
					{ x: new Date("1 Feb 2017"), y: 21040 },
					{ x: new Date("1 Mar 2017"), y: 21840 },
					{ x: new Date("1 Apr 2017"), y: 22760 },
					{ x: new Date("1 May 2017"), y: 24800 },
					{ x: new Date("1 Jun 2017"), y: 24400 },
					{ x: new Date("1 Jul 2017"), y: 25440 },
					{ x: new Date("1 Aug 2017"), y: 27720 },
					{ x: new Date("1 Sep 2017"), y: 27200 },
					{ x: new Date("1 Oct 2017"), y: 29280 },
					{ x: new Date("1 Nov 2017"), y: 31160 },
					{ x: new Date("1 Dec 2017"), y: 32400 }
				]
			}]
		}
        
        const {_dealer,  _showBackButton} = this.state || {}
        const {num_found, facets, seller_name, street, mean, marketPosition} = _dealer || {}
        const {make, model} = facets || []
        const {_loadDealer, _loadMarket} = this.props || false
        let makeDataPoints = []
        let modelDataPoints = []
        make&&make.map(m=>{
            makeDataPoints.push({x:m.x, y:m.count, indexLabel:m.item})
        })




        const options = {
			animationEnabled: true,
            exportEnabled: true,

			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: `${seller_name} ${parseFloat(marketPosition).toFixed(2)+"%"}`
			},
			data: [{
                click: (e)=>this.handleClickMake(e),
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                indexLabelOrientation: "vertical",
				dataPoints: makeDataPoints
			}]
		}
        

        return (
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
             
             {(_loadDealer||_loadMarket) ? (
         <Loader  size='massive'  active />
            
        ) : (
<div style={{width:'100%', height:"100%", position:"relative"}}>
            <CanvasJSChart options={options}
            
            onRef={ref => this.chart = ref}
            ></CanvasJSChart>
                   {_showBackButton&& <Button  onClick={()=>this.handleClickBackOnFilter()}style={{position:'absolute', right:0, top:20}}primary>Back</Button>}
    
            </div>
        )
             }
             
             
             
               
            </div>
        )
    }
}


export default  DealerStatCard
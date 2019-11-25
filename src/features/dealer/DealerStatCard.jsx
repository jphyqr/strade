import React, { Component } from 'react'
import _ from 'lodash'
import CanvasJSReact from '../../assets/canvasjs.react';
import { Loader, Dimmer } from 'semantic-ui-react';
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
    _dealership : {}, onRef: {}
}




 handleClickMake = (e) =>{
    console.log('handleClickMake', e)
      var chart = this.chart;
      chart.options = visitorsDrilldownedChartOptions;
      chart.options.data = this.options[e.dataPoint.name];
      chart.options.title = { text: e.dataPoint.name }
      chart.render();
  
  }


    componentWillReceiveProps = (nextProps) => {
        if(!_.isEqual(nextProps.dealership,this.state._dealership)){
          console.log('dealer profile Dealership Changed')
            this.setState({_dealership:nextProps.dealership})
       //     this.chart.render()
        }
    }

 componentDidMount(){
     this.setState({_dealership:this.props.dealership})
 }




    render() {

        
        const {_dealership} = this.state || {}
        const {num_found, facets, seller_name, street, mean, marketPosition} = _dealership || {}
        const {make} = facets || []
        const {loading} = this.props || false
        let datapoints = []

        make&&make.map(m=>{
            datapoints.push({x:m.x, y:m.count, indexLabel:m.item})
        })

        const options = {
			animationEnabled: true,
            exportEnabled: true,

			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: `${seller_name} ${parseFloat(marketPosition).toFixed(2)+"%"}`
			},
			data: [{
                click: function(e){
                    alert(  "dataSeries Event => Type: "+ e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
                    },
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                indexLabelOrientation: "vertical",
				dataPoints: datapoints
			}]
		}
        

        return (
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
             
             {loading ? (
         <Loader  size='massive'  active />
            
        ) : (

            <CanvasJSChart options={options}
            
            onRef={ref => this.chart = ref}
            ></CanvasJSChart>
        )
             }
             
             
             
               
            </div>
        )
    }
}


export default  DealerStatCard
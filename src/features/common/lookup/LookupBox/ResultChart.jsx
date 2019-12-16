import React, { Component } from 'react'
import CanvasJSReact from '../../../../assets/canvasjs.react';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class ResultChart extends Component {
 
    render() {
        const {dataPoints} = this.props || []

       let priceDataPoints = []
        dataPoints&&dataPoints.forEach((model, i)=>{
              

           
            priceDataPoints.push({x:parseInt(model), y:0})
            
     



         })


         const options = {
			theme: "dark2",
			animationEnabled: true,
			zoomEnabled: true,
			title:{
				text: "Title"
			},
			axisX: {
				title:"Temperature (in °C)",
				suffix: "°C",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY:{
				title: "Sales",
				includeZero: false,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			data: [{
				type: "scatter",
				markerSize: 15,
				toolTipContent: "<b>Temperature: </b>{x}°C<br/><b>Sales: </b>{y}",
				dataPoints: dataPoints
			}]
		}

        
        return (
            <div>
                {/* <CanvasJSChart options = {options}/> */}
            </div>
        )
    }
}



export default ResultChart
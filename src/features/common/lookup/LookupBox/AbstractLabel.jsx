import React, { Component } from 'react'
import { Label, Message, Button, Segment, Icon } from 'semantic-ui-react'
import ResultChart from './ResultChart'

class AbstractLabel extends Component {
    render() {
     const   {ymmt, numFound, priceMean, CV, priceStddev , radius, dataPoints} = this.props || {}
     let CVGrade
     if(CV<.2)
     CVGrade = "tight"
     else if (CV<.55)
     CVGrade = "medium"
     else
     CVGrade = "wide"
        return (
            <Segment  style={{ width: "100%", display: 'inline-block'}}>
                <Message 
    icon='inbox'
    header= {`${priceMean-priceStddev} to ${priceMean+priceStddev}`}
    content={`Found ${numFound} ${ymmt}s in a ${radius} radius, with a ${CVGrade} distribution`}
  />
  <ResultChart dataPoints={dataPoints}></ResultChart>
   <Button.Group><Button iconlabelPosition='left' onClick={()=>this.props.handleBackButtonClick()}><Icon name='left arrow'></Icon>BACK</Button><Button primary iconlabelPosition='right'><Icon name='right arrow'></Icon>📈 MARKET REPORT</Button></Button.Group>
            </Segment>
        )
    }
}


export default AbstractLabel

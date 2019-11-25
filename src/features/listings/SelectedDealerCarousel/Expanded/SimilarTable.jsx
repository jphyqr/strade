import React, { Component } from 'react'
import {Table} from 'semantic-ui-react'
 class SimilarTable extends Component {
    render() {
        const {items : similarListings} = this.props || []
        return (
            <div style={{overflowX:"scroll"}}>
                <Table celled compact="very" singleLine size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Year</Table.HeaderCell>
        <Table.HeaderCell>Make</Table.HeaderCell>
        <Table.HeaderCell>Model</Table.HeaderCell>
        <Table.HeaderCell>Miles</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>DOM</Table.HeaderCell>
        <Table.HeaderCell>Dealer</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>

         
         {similarListings&&similarListings.map(listing=>(

        
             
      <Table.Row>
      <Table.Cell>{listing&&listing.build&&listing.build.year}</Table.Cell>
      <Table.Cell>{listing&&listing.build&&listing.build.make}</Table.Cell>
         <Table.Cell >{listing&&listing.build.model}</Table.Cell>
         <Table.Cell >{listing&&listing.miles}</Table.Cell>
         <Table.Cell negative>{listing&&listing.price}</Table.Cell> 
         <Table.Cell negative>{listing&&listing.dom}</Table.Cell>
          <Table.Cell negative>{listing&&listing.dealer&&listing.dealer.name}</Table.Cell>
    </Table.Row>

         ))}


    </Table.Body>
  </Table> 
            </div>
        )
    }
}


export default SimilarTable
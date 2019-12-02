import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

 class PotentialGroupTable extends Component {



    renderListingRows = (group) =>{

        const {city, seller_name, source, state} = group || {}
      
        return(
                 
          <Table.Row>
          <Table.Cell>{city}</Table.Cell>
          <Table.Cell>{state}</Table.Cell>
          <Table.Cell>{seller_name}</Table.Cell>
          <Table.Cell>{source}</Table.Cell>

        </Table.Row>
    
    
        )
    }











    render() {
        const {potentialGroups} = this.props || []
        return (
            <div>
                        <Table sortable celled compact="very" singleLine size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>City</Table.HeaderCell>
                <Table.HeaderCell>Seller Name</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>URL</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
        
                 
               {potentialGroups&&potentialGroups.map(group=>(
        
                
              this.renderListingRows(group)
            
                 ))}
        
        
            </Table.Body>
        </Table>
            </div>
        )
    }
}




export default PotentialGroupTable
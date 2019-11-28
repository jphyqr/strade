import React, { Component } from 'react'
import { Table, Loader, Header } from 'semantic-ui-react'
import _ from 'lodash'
import ExpandedItem from '../SelectedDealerCarousel/Expanded/ExpandedItem'




 class DealerListingsTable extends Component {


    state= {
        _dealer: {},
        _makeFilter: {},
        _filteredListings : [],
        _listings : [],
        _listing: {}
    }

     isEmpty = (obj)=>{
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
      
        return JSON.stringify(obj) === JSON.stringify({});
      }
    async componentDidMount(){
     await   this.setState({_dealer:this.props.dealer, _makeFilter:this.props.makeFilter})
     const {listings} = this.state._dealer || []
     await   this.setState({_filteredListings: listings})
    }



rowClickShiv = async (listing) =>{
   this.props.handleClickSimilarInventory(listing)
}

componentDidUpdate = async (prevProps) =>{

    if(!_.isEqual(prevProps.listing,this.state._listing)){
        await this.setState({_listing:prevProps.listing})
        
      
     }

    if(prevProps.loadDealer===true&this.props.loadDealer===false){
     //   await this.setState({_dealer:this.props.dealer})
     console.log('DEALER HAS CHANGED AND LOADED', this.state._dealer)
        const {listings} = this.state._dealer || []
        console.log('should be setting filteredlistings to', listings)
        await this.setState({_filteredListings: listings, _listings: listings})
     }


}

    componentWillReceiveProps = async (nextProps) => {
        if(!_.isEqual(nextProps.dealer,this.state._dealer)){
           await this.setState({_dealer:nextProps.dealer})
           
         
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



        }
    }


renderListingRows = (listing) =>{

    const {build, miles, dom, dom_180, dom_active, dealer, price} = listing || {}
    const {year, make, model} = build || {}
    const {name} = dealer || {}    
    return(
             
      <Table.Row>
      <Table.Cell>{year}</Table.Cell>
      <Table.Cell>
          <a href="#">
          <Header as='h4' onClick={()=>this.rowClickShiv(listing)} >
            <Header.Content>
              {make}
              <Header.Subheader>{model}</Header.Subheader>
            </Header.Content>
          </Header>
          </a>
        </Table.Cell>
         <Table.Cell >{miles}</Table.Cell>
         <Table.Cell negative>{price}</Table.Cell> 
         <Header as='h4' >
            <Header.Content>
              {dom_active}
              <Header.Subheader>{dom_180}/{dom}</Header.Subheader>
            </Header.Content>
          </Header>
          <Table.Cell negative>{name}</Table.Cell>
    </Table.Row>


    )
}


    render() {
        const {_dealer, _makeFilter, _filteredListings} = this.state || {}
        const {listings} = _dealer || []

       const {loadDealer}=this.props || {}   


        return (
          
<div style={{paddingTop:30}}>
      {this.isEmpty(_dealer) ?  <div></div>: 

       loadDealer ?

       (
        <Loader  size='massive'  active />
           
       )

:
        <Table sortable celled compact="very" singleLine size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Year</Table.HeaderCell>
                <Table.HeaderCell>MM</Table.HeaderCell>
                <Table.HeaderCell>Miles</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>DOM</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
        
                 
               {_filteredListings&&_filteredListings.map(listing=>(
        
                
              this.renderListingRows(listing)
            
                 ))}
        
        
            </Table.Body>
        </Table> }
          </div>
        )
    }
}


export default DealerListingsTable

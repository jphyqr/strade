import React, { Component } from 'react'
import {connect} from 'react-redux'
import LookupBox from '../common/lookup/LookupBox.jsx/LookupBox'
import { Button } from 'semantic-ui-react'
import {uploadCSVToFirestore} from './testActions'
import CSVReader from 'react-csv-reader'

const mapState = (state) => ({
    data:state.test.data
})

const actions = {
    uploadCSVToFirestore
}

 class TestComponent extends Component {

state={_searchInput:""}

handleUpdateSearch = (input) =>{
    this.setState({_searchInput: input})
}

    render() {
        return (
            <div>
               <LookupBox  handleUpdateSearch={this.handleUpdateSearch} searchValue={this.state._searchInput/>
               <Button onClick={()=>this.props.uploadCSVToFirestore()}>Upload CSV To Firebase</Button>
               <CSVReader onFileLoaded={data => this.props.uploadCSVToFirestore(data)} />
          
            </div>
        )
    }
}


export default connect(mapState, actions)(TestComponent)
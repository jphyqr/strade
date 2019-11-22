import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapState = (state) => ({
    data:state.test.data
})


 class TestComponent extends Component {
    render() {
        return (
            <div>
                Test Component
            </div>
        )
    }
}


export default connect(mapState, null)(TestComponent)
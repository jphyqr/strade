import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

 class OptionSelect extends Component {
    render() {
        const {categoriesArray} = this.props || []
        const cat = categoriesArray[0] || {}
        const {category} = cat || {}
        const {options} = cat || []
        return (
        
            <div>
                {category.toString()}
           
                   
                {options&&options.map((option, index)=>(
                    <Button onClick={()=>this.props.handleSelectOptionsFromCategory(index)}>{option.item}</Button>
                ))}
                   
               
            </div>
        )
    }
}


export default OptionSelect
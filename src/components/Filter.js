import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

class FilterPosts extends Component {

    render() {

        const cleanedOptions = this.props.getAllCategories(this.props.postCategories.map(
            post => post.category)).map(
                option => (
                    { value: option, label: option }
                ))

        return (
            <Select
                className="mb-3"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                isSearchable
                placeholder="Filter by category"
                autoFocus={true}
                options={cleanedOptions}
                onChange={this.props.addSelectedOptions}
            />
        )
    }
}

export default FilterPosts
import React, { Component } from 'react'

import '../styles/SearchFilterBar.css'

class SearchFilterBar extends Component {

  handleSearchChange = event => {
    const { value } = event.target
    console.log(value)
    this.props.setFilterBy(value)
  }

  render() {
    return (
      <div className="SearchFilterBar">
        <form className="sortForm">
          <SortButton name="id"
                      {...this.props} />
          <SortButton name="title"
                      {...this.props} />
          <SortButton name="director"
                      {...this.props} />
          <SortButton name="year"
                      {...this.props} />
        </form>

        <form className="searchForm">
            <input value={ this.props.filterBy }
                   onChange={ this.handleSearchChange }/>
        </form>
        
      </div>
    )
  }
}

const SortButton = props => {
  const { sortBy, sortAscending, name, setSort } = props

  const value = sortBy === name
                  ? sortAscending
                    ? `${name} +`
                    : `${name} -`
                  : name
  return (
    <input className={ sortBy === name ? 'active' : '' }
                      type="button" 
                      value={ value }
                      onClick={ () => setSort(name) }/>
  )
}



export default SearchFilterBar
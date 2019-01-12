import React, { Component } from 'react'

import '../styles/SortFilterBar.css'

class SortFilterBar extends Component {

  handleSearchChange = event => {
    const { value } = event.target
    this.props.setFilter(value)
  }

  render() {
    return (
      <div className="SortFilterBar">
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
            <input value={ this.props.filter.by }
                   onChange={ this.handleSearchChange }/>
            <span>{ `${this.props.numberMovies} found` }</span>
        </form>
        
      </div>
    )
  }
}

const SortButton = props => {
  const { sort, name, setSort } = props
  const { by, ascending } = sort

  const isActive = by === name ? 'active' : ''
  
  const ascendDescend = isActive 
          ? ascending
            ? 'ascending'
            : 'descending'
          : ''
    

  return (
    <div className={ `${isActive} ${ascendDescend}` }>
      <input 
            type="button" 
            value={ name }
            onClick={ () => setSort(name) }/>
   </div>
  )
}



export default SortFilterBar
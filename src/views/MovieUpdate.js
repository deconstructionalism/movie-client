import React, { Component } from 'react'

import axios from 'axios'
import {
  validateId,
  validateDirector,
  validateYear,
  validateTitle
} from '../bin/validations.js'

class MovieUpdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      director: '',
      year: '',
      message: null
    }
  }

  updateMovie = (event) => {

    const { id, title, director, year } = this.state

    // validations
    const validId = validateId(id)
    const validTitle = validateTitle(title)
    const validYear = validateYear(year)
    const validDirector = validateDirector(director)

    // post request to create a single movie using axios
    // check if these fields are valid or blank before running request
    if ((validTitle || title === '') && 
        (validDirector || director === '') && 
        (validYear || year === '') && 
        validId) {

      // constructs data for patch request, deleted keys with empty values
      const data = { title, director, year }
      for (let key in data) {
        data[key] === '' && delete data[key]
      }
      
      axios.patch(`http://localhost:4741/movies/${ parseInt(id) }`, {
        movie: data
      })
        .then(res => this.setState({ message: `update a movie with ID: ${res.data.movie.id}`}))
        .catch(console.error)
    } else {
      this.setState({ message: `you have invalid form data!`})
    }

  }

  onIdChange = event => this.setState({ id: event.target.value })

  onTitleChange = event => this.setState({ title: event.target.value })

  onDirectorChange = event => this.setState({ director: event.target.value })

  onYearChange = event => this.setState({ year: event.target.value })

  render() {
    return (
      <div>
         <form onSubmit={ this.updateMovie }>
            <input placeholder="id"
                   value={ this.state.id }
                   onChange={ this.onIdChange }/>
            <input placeholder="title"
                   value={ this.state.title }
                   onChange={ this.onTitleChange }/>
            <input placeholder="director"
                   value={ this.state.director }
                   onChange={ this.onDirectorChange }/>
            <input placeholder="year"
                   value={ this.state.year }
                   onChange={ this.onYearChange }
                   type="date"/>
            <input type="submit"
                   value="Update Movie!" />
         </form>
         { this.state.message && <span>{ this.state.message }</span> }
      </div>
    )
  }
}

// remember to export your component so it can
// be imported and used elsewhere
export default MovieUpdate

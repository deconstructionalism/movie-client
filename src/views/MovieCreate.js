import React, { Component } from 'react'

import axios from 'axios'
import { 
  validateDirector,
  validateTitle,
  validateYear
 } from '../bin/validations.js'

class MovieCreate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      director: '',
      year: '',
      message: null
    }
  }

  createMovie = (event) => {

    const { title, year, director } =  this.state

    // validations
    const validTitle = validateTitle(title)
    const validYear = validateYear(year)
    const validDirector = validateDirector(director)

    // post request to create a single movie using axios
    if (validTitle && validDirector && validYear) {
      axios.post('http://localhost:4741/movies', {
        movie: { title, director, year }
      })
        .then(res => this.setState({ message: `made a new movie with ID: ${res.data.movie.id}`}))
        .catch(console.error)
    } else {
      this.setState({ message: `you have invalid form data!`})
    }

  }

  onTitleChange = event => this.setState({ title: event.target.value })

  onDirectorChange = event => this.setState({ director: event.target.value })

  onYearChange = event => this.setState({ year: event.target.value })

  render() {
    return (
      <div>
         <form onSubmit={ this.createMovie }>
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
                   value="Create Movie!" />
         </form>
         { this.state.message && <span>{ this.state.message }</span> }
      </div>
    )
  }
}

// remember to export your component so it can
// be imported and used elsewhere
export default MovieCreate

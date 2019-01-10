import React, { Component } from 'react'
import Movie from '../components/Movie.js'

import axios from 'axios'
import { validateId } from '../bin/validations.js'

class MovieShow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      movieData: null
    }
  }

  getMovie = () => {

    const { id } = this.state

    // validations
    const validId = validateId(id)

    // get request to get a single movie using axios
    if(validId) {
      axios.get(`http://localhost:4741/movies/${ this.state.id }`)
        .then(res => this.setState({ movieData: res.data.movie }))
        .catch(console.error)
    }
  }

  onIdChange = event => this.setState({ id: event.target.value })

  render() {
    return (
      <div>
         <form onSubmit={ this.getMovie }>
            <input type="number"
                   placeholder="Id of movie to get"
                   value={ this.state.id }
                   onChange={ this.onIdChange } />
            <input type="submit"
                   value="Get Movie!" />
         </form>
         { this.state.movieData && <Movie data={ this.state.movieData } /> }

      </div>
    )
  }
}

// remember to export your component so it can
// be imported and used elsewhere
export default MovieShow

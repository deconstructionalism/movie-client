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
    const { setFeedback } = this.props

    // validations
    const validId = validateId(id)

    // get request to get a single movie using axios
    if (validId) {
      axios.get(`http://localhost:4741/movies/${ id }`)
        .then(res => this.setState({ movieData: res.data.movie }))
        .then(() =>  setFeedback('got one movie', 'success'))
        .catch(() => setFeedback('unable to show movie', 'error')
        )
    } else {
      setFeedback('you have invalid form data', 'warn')
    }
  }

  // form input event handlers
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

export default MovieShow

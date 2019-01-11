import React, { Component } from 'react'
import Movie from '../components/Movie.js'

import { getMovies } from '../bin/api.js'

class MovieIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount () {

    const { setFeedback } = this.props
    
    getMovies()
      .then(res => this.setState({ movies: res.data.movies }))
      .then(() => setFeedback('got all movies', 'success'))
      .catch(() => setFeedback('unable to get all movies', 'error'))
  }

  render() {

    const movies = this.state.movies.map((data, index) => {
      return <Movie key={ index } data={ data }/> 
    })

    return (
      <div>
        { movies }
      </div>
    )
  }
}

export default MovieIndex

import React, { Component } from 'react'
import Movie from '../components/Movie.js'

import axios from 'axios'

class MovieIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount () {

    const { setFeedback } = this.props
    
    // get all movies using axios
    axios.get('http://localhost:4741/movies')
      .then(res => this.setState({ movies: res.data.movies }))
      .then(() => setFeedback('got all movies', 'success'))
      .catch(() => setFeedback('unable to get all movies', 'error'))
  }

  render() {

    const movies = this.state.movies.map((data, index) => <Movie key={ index }
                                                                 data={ data }/> )

    return (
      <div>
        { movies }
      </div>
    )
  }
}

export default MovieIndex

import React, { Component } from 'react'
import Movie from '../components/Movie.js'

import { getMovies } from '../bin/api.js'
import { sortNestedObject } from '../bin/helpers.js'

class MovieIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loaded: false,
      sortBy: ['year', true]
    }
  }

  sortMovies = (movies) => {
    const [ field, ascending ] = this.state.sortBy
    switch (field) {
      case 'id':
        return sortNestedObject(movies, 'numeric', ['id'], ascending)        

      case 'director':
        return sortNestedObject(movies, 'alphabetical', ['director'], ascending)        
      
      case 'title':
        return sortNestedObject(movies, 'alphabetical', ['title'], ascending)        
      
      case 'year':
        return sortNestedObject(movies, 'date', ['year'], ascending)        

      default:
        return movies
    }
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.loaded === false 
      ? true 
      : !this.state.loaded
  }

  componentDidMount () {
    this.loadMovies()
  }

  loadMovies = () => {
    const { setFeedback } = this.props
    
    getMovies()
      .then(res => {
        const { movies } = res.data
        this.setState({ movies: this.sortMovies(movies), loaded: false })
        return res
      })
      .then(res => setFeedback(`got ${ res.data.movies.length } movies`, 'success'))
      .then(() => this.setState({ loaded: true }))
      .catch(() => setFeedback('unable to get all movies', 'error'))
  }

  render() {

    const { setFeedback } = this.props

    const movies = this.state.movies.map((data, index) => {
      return <Movie key={ index } 
                    data={ data }
                    setFeedback={ setFeedback }
                    loadMovies={ this.loadMovies }/> 
    })

    return (
      <div>
        { movies }
      </div>
    )
  }
}

export default MovieIndex

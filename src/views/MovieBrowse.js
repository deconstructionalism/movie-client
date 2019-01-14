import React, { Component } from 'react'
import Movie from '../components/Movie.js'

class MovieBrowse extends Component  {
  
  shouldComponentUpdate(nextProps) {
    const { reloadToggle : current } = this.props.feedback
    const { reloadToggle : next } = nextProps.feedback
    return current === !next ? false : true
  }

  render () {
    const { setFeedback, movies, loadMovies } = this.props

    const Movies = movies.map((data, index) => {
      return <Movie key={ index } 
                    data={ data }
                    setFeedback={ setFeedback }
                    loadMovies={ loadMovies }/> 
    })

    return (
      <div>
        { Movies }
      </div>
    )
  }
  
}

export default MovieBrowse

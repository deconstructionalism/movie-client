import React, { Component } from 'react'
import Movie from '../components/Movie.js'


class MovieIndex extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     movies: [],
  //     loaded: false,
  //   }
  // }




  render() {

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

export default MovieIndex

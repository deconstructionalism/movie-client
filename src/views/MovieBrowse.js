import React from 'react'
import Movie from '../components/Movie.js'

const MovieBrowse = props =>  {

  const { setFeedback, movies, loadMovies } = props

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

export default MovieBrowse

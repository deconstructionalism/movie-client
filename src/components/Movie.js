import React from 'react'

import '../styles/Movie.css'

const Movie = props => {
  return (
    <div className="Movie">
      <h1>{ props.data.title }</h1>
      <div className="details">
        <p><b>ID</b>: { props.data.id }</p>
        <p><b>Director</b>: { props.data.director }</p>
        <p><b>Year</b>: { props.data.year }</p>
      </div>
    </div>
  )
}

export default Movie

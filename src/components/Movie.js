import React from 'react'

const Movie = props => {
  return (
    <div>
      <h3>Title: { props.data.title }</h3>
      <p>ID: { props.data.id }</p>
      <p>Director: { props.data.director }</p>
      <p>Year: { props.data.year }</p>
    </div>
  )
}

export default Movie

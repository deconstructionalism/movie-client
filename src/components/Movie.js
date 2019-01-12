import React, { Component } from 'react'

import '../styles/Movie.css'

class Movie extends Component {
  render() {
    return (
      <div className="Movie">
      <h1>{ this.props.data.title }</h1>
      <div className="details">
        <p><b>ID</b>: { this.props.data.id }</p>
        <p><b>Director</b>: { this.props.data.director }</p>
        <p><b>Year</b>: { this.props.data.year }</p>
      </div>
    </div>
    )
  }
}

export default Movie

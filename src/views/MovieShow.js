import React, { Component } from 'react'
import Movie from '../components/Movie.js'

import axios from 'axios'

//the name of the component should match the name
// of the file
// make sure to extend the Component class
class MovieShow extends Component {

  // this is your basic constructor setup
  constructor(props) {
    super(props)
    this.state = {
      movieIndex: 1,
      movieData: null
    }
  }

  /*
  - form to enter the id of the movie we want to get
  - use that form data to make a request of the format /movies/:index
  - save that movie data in state
  - use the state to render a movie component
  */

  // you must have a render function that returns
  // some jsx

  getMovie = () => {
    // get request to get a single movie using axios
    axios.get(`http://localhost:4741/movies/${ this.state.movieIndex }`)
       .then(res => this.setState({ movieData: res.data.movie }))
       .catch(console.error)
  }

  onIdChange = event => this.setState({ movieIndex: event.target.value })

  render() {
    return (
      <div>
         <form onSubmit={ this.getMovie }>
            <input type="number"
                   placeholder="Id of movie to get"
                   value={ this.state.movieIndex }
                   onChange={ this.onIdChange } />
            <input type="submit"
                   value="Get Movie!" />
         </form>
         { this.state.movieData && <Movie data={ this.state.movieData } /> }

      </div>
    )
  }
}

// remember to export your component so it can
// be imported and used elsewhere
export default MovieShow

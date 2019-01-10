// import React in all React component files
// import Component if you are making a stateful
// component
import React, { Component } from 'react'
import axios from 'axios'

//the name of the component should match the name
// of the file
// make sure to extend the Component class
class MovieCreate extends Component {

  // this is your basic constructor setup
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      director: '',
      year: '',
      message: null
    }
  }

  // you must have a render function that returns
  // some jsx

  createMovie = (event) => {

    // validating a few of our form values
    const titleValid = this.state.title.length < 50
    // const yearValid = parseInt(this.state.year) && parseInt(this.state.year) >= 1893

    // post request to create a single movie using axios
    if (titleValid) {
      axios.post('http://localhost:4741/movies', {
        movie: {
          title: this.state.title,
          director: this.state.director,
          year: this.state.year
        }
      })
        .then(res => this.setState({ message: `made a new movie with ID: ${res.data.movie.id}`}))
        .catch(console.error)
    } else {
      this.setState({ message: `you have invalid form data!`})
    }

  }

  onTitleChange = event => this.setState({ title: event.target.value })

  onDirectorChange = event => this.setState({ director: event.target.value })

  onYearChange = event => this.setState({ year: event.target.value })

  render() {
    return (
      <div>
         <form onSubmit={ this.createMovie }>
            <input placeholder="title"
                   value={ this.state.title }
                   onChange={ this.onTitleChange }/>
            <input placeholder="director"
                   value={ this.state.director }
                   onChange={ this.onDirectorChange }/>
            <input placeholder="year"
                   value={ this.state.year }
                   onChange={ this.onYearChange }
                   type="date"/>
            <input type="submit"
                   value="Create Movie!" />
         </form>
         { this.state.message && <span>{ this.state.message }</span> }
      </div>
    )
  }
}

// remember to export your component so it can
// be imported and used elsewhere
export default MovieCreate

// import React in all React component files
// import Component if you are making a stateful
// component
import React, { Component } from 'react'
import axios from 'axios'

//the name of the component should match the name
// of the file
// make sure to extend the Component class
class MovieDelete extends Component {

  // this is your basic constructor setup
  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      message: null
    }
  }

  // you must have a render function that returns
  // some jsx

  deleteMovie = () => {

    const { id } = this.state

    const idValid = parseInt(id) && parseInt(id) >= 0

    // get request to get a single movie using axios
    if(idValid) {
      axios.delete(`http://localhost:4741/movies/${ parseInt(id) }`)
         .then(() => this.setState({ message: `you deleted a movie, ID: ${ parseInt(id) }` }))
         .catch(console.error)
    } else {
      this.setState({ message: 'you did not enter a valid ID!'})
    }
  }

  onIdChange = event => this.setState({ id: event.target.value })

  render() {
    return (
      <div>
         <form onSubmit={ this.deleteMovie }>
            <input type="number"
                   placeholder="Id of movie to get"
                   value={ this.state.id }
                   onChange={ this.onIdChange } />
            <input type="submit"
                   value="Delete Movie!" />
         </form>
         { this.state.message && <span>{ this.state.message }</span> }

      </div>
    )
  }
}

// remember to export your component so it can
// be imported and used elsewhere
export default MovieDelete

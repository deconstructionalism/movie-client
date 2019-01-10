import React, { Component } from 'react'

import axios from 'axios'
import { validateId } from '../bin/validations.js'

class MovieDelete extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      message: null
    }
  }


  deleteMovie = () => {

    const { id } = this.state

    // validations
    const validId = validateId(id)

    // get request to get a single movie using axios
    if(validId) {
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

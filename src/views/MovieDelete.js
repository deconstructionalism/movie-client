import React, { Component } from 'react'

import axios from 'axios'
import { validateId } from '../bin/validations.js'
import { clearForm } from '../bin/helpers.js'

class MovieDelete extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: 1
    }
  }

  deleteMovie = () => {

    const { id } = this.state
    const { setFeedback } = this.props

    // validations
    const validId = validateId(id)

    // get request to get a single movie using axios
    if (validId) {

      // clear the form
      clearForm(this)

      axios.delete(`http://localhost:4741/movies/${ parseInt(id) }`)
         .then(() => setFeedback(`you deleted a movie, ID: ${ parseInt(id) }`, 'success'))
         .catch(() => setFeedback(`unable to delete the movie`, 'error'))
    } else {
      setFeedback('you have invalid form data', 'warn')
    }
  }

  // form input event handlers
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
      </div>
    )
  }
}

export default MovieDelete

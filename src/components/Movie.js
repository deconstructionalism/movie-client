import React, { Component } from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import '../styles/Movie.css'
import { updateMovie } from '../bin/api.js'

class Movie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: 'normal'
    }
  }

  render() {
    return (
      <div className="Movie">
        <h1>
          { this.props.data.title }
          <MovieToolBar mode={ this.state.mode }/>
        </h1>
        <div className="details">
          <p><b>ID</b>: { this.props.data.id }</p>

          { this.state.mode === 'edit' 
            ? ( 
              <Form buttonText="Update Movie"
                // setFeedback={ props.setFeedback }
                feedbackSuccess={ res => `updated movie ID: ${ res.data.movie.id }` }
                feedbackFailure="failed to update movie" 
                request={ updateMovie }
                dropEmpty>

                <Input name="title"
                        type="text"
                        errormessage="must be 50 characters or less"/>
                <Input name="director"
                        errormessage="must be a valid name"
                        type="text"/>
                <Input name="year"
                        errormessage="must be on or after 1893"
                        type="date"/>

              </Form> )
              : (
                <React.Fragment>
                  <p><b>Director</b>: { this.props.data.director }</p>
                  <p><b>Year</b>: { this.props.data.year }</p>
                </React.Fragment>
              )       
          }
      
        </div>
      </div>
    )
  }
}

const MovieToolBar = props => {

  const { mode } = props 
  return (
    <div className="MovieToolBar">
      { mode === 'normal' 
          ? <React.Fragment>
              <button>E</button>
              <button>D</button>
            </React.Fragment>
          : <button>X</button>
      }
    </div>
  )
}

export default Movie

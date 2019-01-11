import React, { Component } from 'react'
import Movie from '../components/Movie.js'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import { getMovie }  from '../bin/api.js'

class MovieShow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movieData: ''
    }
  }

  gotMovieSuccess = res => {
    this.setState({ movieData: res.data.movie })
  }

  render() {
    return (
      <div>
        <Form legendText="Show a Movie"
            buttonText="Get Movie"
            setFeedback={ this.props.setFeedback }
            feedbackSuccess="got movie"
            feedbackFailure="failed to get movie"
            request={ getMovie }
            postRequestCallback={ this.gotMovieSuccess }>

               <Input name="id"
                      type="text"
                      errorMessage="must be a positive integer"
                      required/>

        </Form>
         
         <section>
           { this.state.movieData && <Movie data={ this.state.movieData } /> }
         </section>

      </div>
    )
  }
}

export default MovieShow

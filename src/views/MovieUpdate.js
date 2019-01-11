import React from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import { updateMovie } from '../bin/api.js'

const MovieUpdate = props => {
  return (
    <div>
      <Form legendText="Update a Movie"
            buttonText="Update Movie"
            setFeedback={ props.setFeedback }
            feedbackSuccess="update a movie"
            feedbackFailure="failed to update a movie"
            request={ updateMovie }
            dropEmpty>

              <Input name="id"
                     type="number"
                     errorMessage="must be a positive integer"
                     required/>
               <Input name="title"
                      type="text"
                      errorMessage="must be 50 characters or less"
                      required/>
               <Input name="director"
                      errorMessage="must be a valid name"
                      type="text"/>
               <Input name="year"
                      errorMessage="must be on or after 1893"
                      type="date"/>

      </Form>
    </div>
  )
}

export default MovieUpdate

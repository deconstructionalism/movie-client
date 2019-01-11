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
                     required/>
              <Input name="title"
                     type="text"/>
              <Input name="director"
                     type="text"/>
              <Input name="year"
                     type="date"/>

      </Form>
    </div>
  )
}

export default MovieUpdate

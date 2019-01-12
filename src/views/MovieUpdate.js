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
            feedbackSuccess={ res => `updated movie ID: ${ res.data.movie.id }` }
            feedbackFailure="failed to update movie" 
            request={ updateMovie }
            dropEmpty>

              <Input name="id"
                     type="number"
                     errormessage="must be a positive integer"
                     required/>
               <Input name="title"
                      type="text"
                      errormessage="must be 50 characters or less"/>
               <Input name="director"
                      errormessage="must be a valid name"
                      type="text"/>
               <Input name="year"
                      errormessage="must be on or after 1893"
                      type="date"/>

      </Form>
    </div>
  )
}

export default MovieUpdate

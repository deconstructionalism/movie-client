import React from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import { deleteMovie } from '../bin/api.js'

const MovieDelete = props => {

  return (
    <div>
      <Form legendText="Delete a Movie"
            buttonText="Delete Movie"
            setFeedback={ props.setFeedback }
            feedbackSuccess={ (_, form) => `deleted movie ID: ${ form.id.value }` }
            feedbackFailure="failed to delete movie"
            request={ deleteMovie }>

               <Input name="id"
                      type="text"
                      errormessage="must be a positive integer"
                      required/>

        </Form>
    </div>
  )
}

export default MovieDelete

import React from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import { deleteMovie } from '../bin/api.js'

const MovieDeleteForm = props => (

    <Form buttonText="Delete Movie"
          setFeedback={ props.setFeedback }
          feedbackSuccess={ (_, form) => `deleted movie ID: ${ form.id.value }` }
          feedbackFailure="failed to delete movie"
          request={ deleteMovie }
          postRequestCallback={ props.postRequestCallback }>
  
          <Input name="id"
                 value={ props.data.id } 
                 hidden/>
  
    </Form>
  )

export default MovieDeleteForm
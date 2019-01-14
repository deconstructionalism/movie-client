import React from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import { updateMovie } from '../bin/api.js'

const MovieUpdateForm = props => (

    <Form buttonText="Update Movie"
          setFeedback={ props.setFeedback }
          feedbackSuccess={ res => `updated movie ID: ${ res.data.movie.id }` }
          feedbackFailure="failed to update movie" 
          request={ updateMovie }
          postRequestCallback={ props.postRequestCallback }
          dropEmpty>
  
      <Input name="id"
             value={ props.data.id } 
             hidden/>
  
      <Input name="title"
             type="text"
             value={ props.data.title } 
             errormessage="must be 50 characters or less"/>
      <Input name="director"
             value={ props.data.director } 
             errormessage="must be a valid name"
             type="text"/>
      <Input name="year"
             value={ props.data.year } 
             errormessage="must be on or after 1893"
             type="date"/>
  
    </Form> 
  )

  export default MovieUpdateForm
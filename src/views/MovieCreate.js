import React from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import { createMovie }  from '../bin/api.js'

const MovieCreate = props => {

    return (
      <div>
        <Form legendText="Make a New Movie"
              buttonText="Create Movie"
              setFeedback={ props.setFeedback }
              feedbackSuccess={ res => `created movie ID: ${ res.data.movie.id }` }
              feedbackFailure="failed to create a movie"
              request={ createMovie }>

               <Input name="title"
                      type="text"
                      errormessage="must be 50 characters or less"
                      required/>
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

export default MovieCreate
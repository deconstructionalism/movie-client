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
              feedbackSuccess="made a new movie"
              feedbackFailure="failed to make a new movie"
              request={ createMovie }>

               <Input name="title"
                      type="text"
                      required/>
               <Input name="director"
                      type="text"/>
               <Input name="year"
                      type="date"/>

        </Form>
      </div>
    )
}

export default MovieCreate
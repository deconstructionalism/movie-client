import React, { Component } from 'react'
import Form from '../components/Form.js'
import Input from '../components/Input.js'

import '../styles/Movie.css'
import { updateMovie, deleteMovie } from '../bin/api.js'

class Movie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: null
    }
  }

  onCancelClick = () => this.setState({ mode: null })
  onEditClick = () => this.setState({ mode: 'edit' })
  onDeleteClick = () => this.setState({ mode: 'delete' })

  render() {

    const Contents = () => {
      const { mode } = this.state
      const { data, setFeedback } = this.props

      switch (mode) {
        case 'edit':
          return <MovieUpdateForm data={ data } setFeedback={ setFeedback }/>

        case 'delete':
          return <MovieDeleteForm data={ data } setFeedback={ setFeedback }/>
          
        default: 
          return (
            <React.Fragment>
              <p><b>ID</b>: { this.props.data.id }</p>
              <p><b>Director</b>: { this.props.data.director }</p>
              <p><b>Year</b>: { this.props.data.year }</p>
            </React.Fragment>
          )
      }
    }
    

    return (
      <div className="Movie">
        <h1>
          { this.props.data.title }
          <MovieToolBar mode={ this.state.mode }
                        onCancelClick={ this.onCancelClick }
                        onDeleteClick={ this.onDeleteClick }
                        onEditClick={ this.onEditClick }/>
        </h1>
        <div className="details">
          
          <Contents />
      
        </div>
      </div>
    )
  }
}

const MovieUpdateForm = props => (

  <Form buttonText="Update Movie"
        setFeedback={ props.setFeedback }
        feedbackSuccess={ res => `updated movie ID: ${ res.data.movie.id }` }
        feedbackFailure="failed to update movie" 
        request={ updateMovie }
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

const MovieDeleteForm = props => (

  <Form buttonText="Delete Movie"
        setFeedback={ props.setFeedback }
        feedbackSuccess={ (_, form) => `deleted movie ID: ${ form.id.value }` }
        feedbackFailure="failed to delete movie"
        request={ deleteMovie }>

        <Input name="id"
               value={ props.data.id } 
               hidden/>

  </Form>
)

const MovieToolBar = props => {

  const { 
    mode,
    onCancelClick,
    onDeleteClick,
    onEditClick
   } = props 

  return (
    <div className="MovieToolBar">
      { mode === null 
          ? <React.Fragment>
              <button onClick={ onEditClick }>E</button>
              <button onClick={ onDeleteClick }>D</button>
            </React.Fragment>
          : <button onClick={ onCancelClick }>X</button>
      }
    </div>
  )
}

export default Movie

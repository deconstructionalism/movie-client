import React, { Component } from 'react'
import MovieToolbar from '../components/MovieToolbar.js'
import MovieUpdateForm from '../components/MovieUpdateForm.js'
import MovieDeleteForm from '../components/MovieDeleteForm.js'

import '../styles/Movie.css'

class Movie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mode: null
    }
  }

  onCancelClick = () => this.setState({ mode: null })
  onUpdateClick = () => this.setState({ mode: 'edit' })
  onDeleteClick = () => this.setState({ mode: 'delete' })

  render() {

    const Contents = () => {
      const { mode } = this.state
      const { data, setFeedback, loadMovies } = this.props

      switch (mode) {
        case 'edit':
          return <MovieUpdateForm data={ data } 
                                  setFeedback={ setFeedback }
                                  postRequestCallback={ () => {
                                    this.onCancelClick()
                                    loadMovies(true) 
                                  } }/>

        case 'delete':
          return <MovieDeleteForm data={ data } 
                                  setFeedback={ setFeedback }
                                  postRequestCallback={ () => {
                                    this.onCancelClick()
                                    loadMovies(true) 
                                  } }/>
        
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
          <MovieToolbar mode={ this.state.mode }
                        onCancelClick={ this.onCancelClick }
                        onDeleteClick={ this.onDeleteClick }
                        onUpdateClick={ this.onUpdateClick }/>
        </h1>
        <div className="details">
          
          <Contents />
      
        </div>
      </div>
    )
  }
}

export default Movie

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import MovieIndex from './views/MovieIndex.js'
import MovieShow from './views/MovieShow.js'
import MovieCreate from './views/MovieCreate.js'
import MovieUpdate from './views/MovieUpdate.js'
import MovieDelete from './views/MovieDelete.js'
import Feedback from './components/Feedback.js'

import './styles/App.css'

const Home = () => {
  return (
    <p>Welcome to the Movie app!</p>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: {
        message: '',
        type: null
      }
    }
  }

  setFeedback = (message, type='success') => {
    console.log(message, type)
    this.setState(prevState => Object.assign({}, prevState, { feedback: { message, type } }))
  }

  render() {
    return (
      // this is our app
      <div>
        <h1>Movie Client</h1>

        {/* this is our nav */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">All Movies</Link>
          </li>
          <li>
            <Link to="/movie">Single Movie</Link>
          </li>
          <li>
            <Link to="/add-movie">Add Movie</Link>
          </li>
          <li>
            <Link to="/update-movie">Update Movie</Link>
          </li>
          <li>
            <Link to="/delete-movie">Delete Movie</Link>
          </li>
        </ul>

        {/* feedback bar */}
        <Feedback type={ this.state.feedback.type }
                  message={ this.state.feedback.message } />

        {/* here are our routes ie what to render when we visit a link */}
        <Route exact path="/" component={Home}/>
        <Route exact path="/movies" 
               render={ () => <MovieIndex setFeedback={ this.setFeedback }/> }/>
        <Route exact path="/movie" 
               render={ () => <MovieShow setFeedback={ this.setFeedback }/> }/>
        <Route exact path="/add-movie" 
               render={ () => <MovieCreate setFeedback={ this.setFeedback }/> }/>
        <Route exact path="/update-movie" 
               render={ () => <MovieUpdate setFeedback={ this.setFeedback }/> }/>
        <Route exact path="/delete-movie" 
               render={ () => <MovieDelete setFeedback={ this.setFeedback }/> }/>
      </div>
    )
  }
}

export default App

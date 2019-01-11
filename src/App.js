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
      message: '',
      type: null,
      reloadToggle: true
    }
  }

  setFeedback = (message, type='success') => {
    this.setState({ message, type, reloadToggle: !this.state.reloadToggle })
  }

  render() {
    return (
      // this is our app
      <div>
        <header>
          <h1>Movies</h1>

          {/* this is our nav */}

          {/* feedback bar */}
          <Feedback key={ this.state.reloadToggle } 
                    message={ this.state.message }
                    type={ this.state.type }/>
        </header>
          <nav>
              <Link to="/">Home</Link>
              <Link to="/movies">Show All</Link>
              <Link to="/movie">Show One</Link>
              <Link to="/add-movie">Add</Link>
              <Link to="/update-movie">Update</Link>
              <Link to="/delete-movie">Delete</Link>
          </nav>

        <main>

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
        </main>
      </div>
    )
  }
}

export default App

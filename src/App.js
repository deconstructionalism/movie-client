import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import MovieIndex from './views/MovieIndex.js'
import MovieShow from './views/MovieShow.js'
import MovieCreate from './views/MovieCreate.js'
import MovieUpdate from './views/MovieUpdate.js'
import MovieDelete from './views/MovieDelete.js'

import './styles/App.css'

const Home = () => {
  return (
    <p>Welcome to the Movie app!</p>
  )
}

// stateful component
class App extends Component {
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

        {/* here are our routes
          ie what to render when we visit a link */}
        <Route exact path="/" component={Home}/>
        <Route exact path="/movies" component={MovieIndex}/>
        <Route exact path="/movie" component={MovieShow}/>
        <Route exact path="/add-movie" component={MovieCreate}/>
        <Route exact path="/update-movie" component={MovieUpdate}/>
        <Route exact path="/delete-movie" component={MovieDelete}/>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import MovieIndex from './views/MovieIndex.js'
import MovieShow from './views/MovieShow.js'
import MovieCreate from './views/MovieCreate.js'
import MovieUpdate from './views/MovieUpdate.js'
import MovieDelete from './views/MovieDelete.js'
import Feedback from './components/Feedback.js'
import Header from './components/Header.js'

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
      reloadToggle: true,
    }
  }

  setFeedback = (message, type='success') => {
    this.setState({ message, type, reloadToggle: !this.state.reloadToggle })
  }

  render() {
    return (
      <div className="App">
        <Feedback key={ this.state.reloadToggle } 
          message={ this.state.message }
          type={ this.state.type }/>
  
        <Header currentPath={ this.props.history.location.pathname }/>

        <main>

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

export default withRouter(App)

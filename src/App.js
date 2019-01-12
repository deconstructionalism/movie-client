import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Feedback from './components/Feedback.js'
import Header from './components/Header.js'

import './styles/App.css'
import routes from './config/routes.js'
import { sortNestedObject } from './bin/helpers.js'
import { getMovies } from './bin/api.js'


class App extends Component {
  constructor(props) {
    super(props)
  this.state = {
      feedbackMessage: '',
      feedbackType: null,
      feedbackReloadToggle: true,
      sortBy: 'director',
      sortAscending: false,
      movies: [],
      moviesLoaded: false,
      filterBy: ''
    }
  }


  // shouldComponentUpdate(_, nextState) {
  //   return nextState.moviesLoaded === false 
  //     ? true 
  //     : !this.state.moviesLoaded
  // }


  sortMovies = (movies) => {
    movies = movies || this.state.movies
    const { sortBy, sortAscending } = this.state

    let sortedMovies

    switch (sortBy) {
      case 'id':
        sortedMovies = sortNestedObject(movies, 'numeric', ['id'], sortAscending)        
        break
      case 'director':
        sortedMovies = sortNestedObject(movies, 'alphabetical', ['director'], sortAscending)        
        break
      case 'title':
        sortedMovies = sortNestedObject(movies, 'alphabetical', ['title'], sortAscending)        
        break
      case 'year':
        sortedMovies = sortNestedObject(movies, 'date', ['year'], sortAscending)        
        break
      default:
        sortedMovies = movies
        break
    }

    this.setState({ movies: sortedMovies })
  }

  componentDidMount () {
    this.loadMovies()
  }

  loadMovies = () => {
    
    getMovies()
      .then(res => {
        const { movies } = res.data
        // this.setState({ movies, moviesLoaded: false })
        this.sortMovies(movies)
        return res
      })
      .then(res => this.setFeedback(`got ${ res.data.movies.length } movies`, 'success'))
      .then(() => this.setState({ moviesLoaded: true }))
      .catch(() => this.setFeedback('unable to get all movies', 'error'))
  }

  setFeedback = (feedbackMessage, feedbackType='success') => {
    this.setState({ feedbackMessage, feedbackType, reloadToggle: !this.state.reloadToggle })
  }

  setSort = sortBy => {
    sortBy === this.state.sortBy 
      ? this.setState({ sortAscending: !this.state.sortAscending }, this.sortMovies)
      : this.setState({ sortAscending: true, sortBy }, this.sortMovies)
  }

  setFilterBy = filterBy => {
    this.setState({ filterBy }, this.sortMovies)
  }

  filterMovies = () => {
    const { movies, sortBy, filterBy } = this.state
    if (filterBy === '') return movies

    return movies.filter(movie => {
      const sortValue = movie[sortBy]
      if (!sortValue) return false
      return sortValue.toLowerCase().includes(filterBy.toLocaleLowerCase())
    })
  }

  render() {

    const { movies, ...rest } = this.state

    const Routes = routes.map((route, index) => {
      const { path, view: View } = route
      return <Route key={ index }
                    exact path={ path } 
                    render={ () => <View setFeedback={ this.setFeedback }
                                         loadMovies={ this.loadMovies }
                                         movies={ this.filterMovies() }
                                         { ...rest }/> }/>
    })

    return (
      <div className="App">
        <Feedback key={ this.state.feedbackReloadToggle } 
                  message={ this.state.feedbackMessage }
                  type={ this.state.feedbackType }/>
  
        <Header currentPath={ this.props.history.location.pathname }
                sortBy={ this.state.sortBy }
                sortAscending={ this.state.sortAscending }
                setSort={ this.setSort }
                setFilterBy={ this.setFilterBy }
                filterBy={ this.state.filterBy }/>

        <main>
          { Routes }
        </main>
      </div>
    )
  }
}

export default withRouter(App)

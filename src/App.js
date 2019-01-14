import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Feedback from './components/Feedback.js'
import Header from './components/Header.js'

import './styles/App.css'
import routes from './config/routes.js'
import { sortNestedObject, generateNestedState as genNestState } from './bin/helpers.js'
import { getMovies } from './bin/api.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      feedback: {
        message: '',
        type: null, 
        reloadToggle: true
      },

      sort: {
        by: 'id',
        ascending: true
      },

      filter: {
        query: ''
      },

      movies: []
    }
  }

  componentDidMount () {
    this.loadMovies()
  }

  sortMovies = () => {
    const { by, ascending } = this.state.sort
    const { movies } = this.state

    let sortedMovies

    switch (by) {
      case 'id':
        sortedMovies = sortNestedObject(movies, 'numeric', ['id'], ascending)        
        break
      case 'director':
        sortedMovies = sortNestedObject(movies, 'alphabetical', ['director'], ascending)        
        break
      case 'title':
        sortedMovies = sortNestedObject(movies, 'alphabetical', ['title'], ascending)        
        break
      case 'year':
        sortedMovies = sortNestedObject(movies, 'date', ['year'], ascending)        
        break
      default:
        sortedMovies = movies
        break
    }

    this.setState({ movies: sortedMovies })
  }

  filterMovies = () => {
    const { by } = this.state.sort
    const { query } = this.state.filter
    const { movies } = this.state

    if (query === '') return movies

    return movies.filter(movie => {
      const sortValue = movie[by]

      if (!sortValue) return false

      return typeof sortValue === "number" 
        ?  sortValue === parseInt(query)
        :  sortValue.toLowerCase().includes(query.toLocaleLowerCase())
    })
  }


  loadMovies = (silent=false) => {

    console.log(silent)

    getMovies()
      .then(res => {
        const { movies } = res.data

        this.setState({ movies, moviesLoaded: false }, this.sortMovies)
        return res
      })
      .then(res => !silent && this.setFeedback(`got ${ res.data.movies.length } movies`, 'success'))
      .then(() => this.setState({ moviesLoaded: true }))
      .catch(() => !silent && this.setFeedback('unable to get all movies', 'error'))
  }

  setFeedback = (message, type='success') => {
    this.setState(prevState => genNestState(prevState, 'feedback', { 
      message, 
      type, 
      reloadToggle: false 
    }), () => this.setState(prevState => genNestState(prevState, 'feedback', { 
      reloadToggle: true 
    })))
  }

  setSort = nextBy => {
    const { by } = this.state.sort
    nextBy === by
      ? this.setState(prevState => genNestState(prevState, 'sort', { ascending: !prevState.sort.ascending }),
        this.sortMovies)
      : this.setState(prevState => genNestState(prevState, 'sort', { by: nextBy, ascending: true }),
        this.sortMovies)
  }

  setFilter = query => {
    this.setState(prevState => genNestState(prevState, 'filter', { query }))
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
       
        <Feedback key={ this.state.feedback.reloadToggle }
                  message={ this.state.feedback.message }
                  type={ this.state.feedback.type }/>
  
        <Header currentPath={ this.props.history.location.pathname }
                setSort={ this.setSort }
                setFilter={ this.setFilter }
                filter ={ this.state.filter }
                sort={ this.state.sort }
                numberMovies = { this.filterMovies().length }/>

        <main>
          { Routes }
        </main>
      </div>
    )
  }
}

export default withRouter(App)

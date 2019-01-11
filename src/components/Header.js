import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css'

const Header = props => {

    return (
      <React.Fragment>
        <h1 className="Header">Movies</h1>
        <nav className="Header">
            <Link to="/"
                  className={ props.currentPath === '/' ? 'current' : undefined}>Home</Link>
            <Link to="/movies"
                  className={ props.currentPath === '/movies' ? 'current' : undefined}>Show All</Link>
            <Link to="/movie"
                  className={ props.currentPath === '/movie' ? 'current' : undefined}>Show One</Link>
            <Link to="/add-movie"
                  className={ props.currentPath === '/add-movie' ? 'current' : undefined}>Add</Link>
            <Link to="/update-movie"
                  className={ props.currentPath === '/update-movie' ? 'current' : undefined}>Update</Link>
            <Link to="/delete-movie"
                  className={ props.currentPath === '/delete-movie' ? 'current' : undefined}>Delete</Link>
        </nav>
      </React.Fragment>
    )
}

export default Header
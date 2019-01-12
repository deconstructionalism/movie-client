import React from 'react'
import { Link } from 'react-router-dom'
import SortFilterBar from '../components/SortFilterBar.js'

import '../styles/Header.css'
import routes from '../config/routes.js'

const Header = props => {

    const { currentPath } = props

    const Links = routes.map((route, index) => {
          const { path, linkText } = route
          return <Link key={ index }
                       to={ path }
                       className={ currentPath === path ? 'current' : undefined }>{ linkText }</Link>
    })

    return (
      <React.Fragment>
        <h1 className="Header">Movies</h1>
        <nav className="Header">
          { Links }
          { currentPath === '/movies' 
              ? <SortFilterBar sortBy={ props.sortBy }
                                 sortAscending={ props.sortAscending }
                                 setSort={ props.setSort }
                                 setFilterBy={ props.setFilterBy }
                                 filterBy={ props.filterBy }/> 
              : undefined }
        </nav>
      </React.Fragment>
    )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'

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

        </nav>
      </React.Fragment>
    )
}

export default Header
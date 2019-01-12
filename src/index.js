import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'

import './styles/index.css'

const AppRouter = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'))

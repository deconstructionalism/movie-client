import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'

// this is a stateless Component
// that wraps our whole application in
// a HashRouter
const AppRouter = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'))

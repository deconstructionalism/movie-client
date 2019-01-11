import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Feedback from './components/Feedback.js'
import Header from './components/Header.js'

import './styles/App.css'
import routes from './config/routes.js'

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

    const Routes = routes.map((route, index) => {
      const { path, view: View } = route
      return <Route key={ index }
                    exact path={ path } 
                    render={ () => <View setFeedback={ this.setFeedback }/> }/>
    })

    return (
      <div className="App">
        <Feedback key={ this.state.reloadToggle } 
                  message={ this.state.message }
                  type={ this.state.type }/>
  
        <Header currentPath={ this.props.history.location.pathname }/>

        <main>
          { Routes }
        </main>
      </div>
    )
  }
}

export default withRouter(App)

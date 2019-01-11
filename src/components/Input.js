import React, { Component } from 'react'
import { FormContext } from '../components/Form.js'

import { titleCase } from '../bin/helpers.js'
import '../styles/Input.css'

class Input extends Component {

    static contextType = FormContext

    render() {
      const { name } = this.props
      const myState = this.context[name]

      return (
        <label className="Input">
          <span>{ titleCase(this.props.name) }</span>
          <input className={ myState && myState.invalid ? 'invalid': '' } {...this.props} />
        </label>
      )
    }
  }

export default Input
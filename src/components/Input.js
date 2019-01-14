import React, { Component } from 'react'

import { titleCase } from '../bin/helpers.js'
import '../styles/Input.css'

class Input extends Component {

    render() {
      const { 
        invalid, 
        errormessage='error', 
        hidden,
        ...rest
      } = this.props

      if (hidden) return null

      return (
        <label className="Input">
          <span>{ titleCase(this.props.name) }</span>
          <input className={ invalid === true ? 'invalid': '' } 
                 { ...rest} />
          { invalid 
              ? <span className="invalid">{ errormessage }</span>
              : undefined
          }
        </label>
      )
    }
  }

export default Input
import React, { Component } from 'react'

import '../styles/Form.css'
import * as validations from '../bin/validations.js'
import { titleCase } from '../bin/helpers.js'

class Form extends Component {

  constructor(props) {
      super(props)
      this.state = {}
  }

  componentWillMount () {
    const { children } = this.props
    const initialState = {}

    React.Children.forEach(children, child => {
      const { name, value } = child.props
      
      if (name) initialState[name] = { value: value || '', invalid: false}
    })

    this.setState(initialState)
  }

  onFieldChange = event => {
    const { name, value } = event.target

    this.setState(prevState => {
      const newFieldData = { 
        [name]: { invalid: false, value }
      }
      return { ...prevState, ...newFieldData }
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.validateFields()
  }

  validateFields = () => {
    const nextState = {}
    for(let key in this.state) {

      const { invalid, value } = this.state[key]
      const validatorName = `validate${titleCase(key)}`
      const validator = validations[validatorName]

      nextState[key] = validator
        ? { value, invalid: value === '' ? false : !validator(value) }
        : { value, invalid }
    }

    this.setState(nextState, this.onValidationCompletion)
  }

  onValidationCompletion = () => {
    const { setFeedback } = this.props

    const stateValues = Object.values(this.state)
    const allValid = stateValues.every(value => value.invalid === false)
    if (!allValid) {
      setFeedback('you have invalid form data', 'warn')
      return
    } else {
      const data = this.constructData()
      this.sendData(data)
    }
  }

  constructData = () => {
    const { dropEmpty } = this.props

    const stateData = {...this.state}
    for(let [key, fieldData] of Object.entries(stateData)) {
      stateData[key] = fieldData.value
      dropEmpty && fieldData.value === '' && delete stateData[key] 
    }
    return stateData
  }

  sendData = data => {
    const { 
      feedbackSuccess='succeeded',
      feedbackFailure='failed',
      setFeedback,
      postRequestCallback
    } = this.props
    
    this.props.request(data)
      .then(res => {
        setFeedback(this.dynamicFeedback(res, feedbackSuccess), 'success')
        postRequestCallback && postRequestCallback(res)
      })
      .catch(err => {
        setFeedback(this.dynamicFeedback(err, feedbackFailure), 'error')
        postRequestCallback && postRequestCallback(err)
      })
      .finally(this.clearForm)
  }

  clearForm = () => {
    this.setState(prevState => {
      const newState = {}
      for(let key in prevState) {
        newState[key] = { value: '', invalid: false}
      }
      return newState
    })
}

  dynamicFeedback = (res, feedback) => {
    return feedback instanceof Function
      ? feedback(res, this.state) 
      : feedback
  }

  render() {
    
    const Children = React.Children.map(this.props.children, child => {
      const { name: childName } = child.props

      return childName 
        ? React.cloneElement(child, { 
            value: this.state[childName].value,
            invalid: this.state[childName].invalid,
            onChange: this.onFieldChange
        })
        : child
    })


    return (
      <form className="Form"
            onSubmit={ this.onFormSubmit }>
            { this.props.legendText && <legend>{ this.props.legendText }</legend> }
            <fieldset>

              { Children }
  
              <input type="submit" 
                    value={ this.props.buttonText ? this.props.buttonText : 'Submit' } />
            </fieldset>
      </form>
    )
  }
}

export default Form
import React, { Component } from 'react'

import '../styles/Form.css'
import * as validations from '../bin/validations.js'
import { titleCase } from '../bin/helpers.js'

export const FormContext = React.createContext()

class Form extends Component {

  constructor(props) {
      super(props)
      this.state = {}
  }

  componentDidMount () {
    const { children } = this.props
    const initialState = {}

    React.Children.forEach(children, child => {
      const { name } = child.props
      if (name) initialState[name] = { value: '', invalid: false}
    })

    this.setState(initialState)
  }

  onFormChange = event => {
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
      const data = this.getData()
      this.sendData(data)
    }
  }

  sendData = (data) => {
    const { 
      feedbackSuccess='succeeded',
      feedbackFailure='failed',
      setFeedback,
      postRequestCallback
    } = this.props
    
    this.props.request(data)
      .then(postRequestCallback)
      .then(() => setFeedback(feedbackSuccess, 'success'))
      .catch(() => setFeedback(feedbackFailure, 'error'))
  }

  getData = () => {
    const { dropEmpty } = this.props

    const stateData = {...this.state}
    for(let [key, fieldData] of Object.entries(stateData)) {
      stateData[key] = fieldData.value
      dropEmpty && fieldData.value === '' && delete stateData[key] 
    }
    return stateData
  }

  render() {

    return (
      <form className="Form"
            onSubmit={ this.onFormSubmit }
            onChange={ this.onFormChange }>
            { this.props.legendText && <legend>{ this.props.legendText }</legend> }
            <fieldset>
              <FormContext.Provider value={ this.state }>
                { this.props.children }
              </FormContext.Provider>
    
              <input type="submit" 
                    value={ this.props.buttonText ? this.props.buttonText : 'Submit' } />
            </fieldset>
      </form>
    )
  }
}

export default Form
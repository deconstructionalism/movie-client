import React from 'react'

import '../styles/Feedback.css'

const Feedback = props => props.message 
    ?  <span className={ `Feedback ${props.type}` }>{ props.message }</span>
    : null

export default Feedback
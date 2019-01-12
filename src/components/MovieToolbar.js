import React from 'react'

import '../styles/MovieToolbar.css'

const MovieToolbar = props => {

    const { 
      mode,
      onCancelClick,
      onDeleteClick,
      onEditClick
     } = props 
  
    return (
      <div className="MovieToolbar">
        { mode === null 
            ? <React.Fragment>
                <button onClick={ onEditClick }>E</button>
                <button onClick={ onDeleteClick }>D</button>
              </React.Fragment>
            : <button onClick={ onCancelClick }>X</button>
        }
      </div>
    )
  }
  
  export default MovieToolbar
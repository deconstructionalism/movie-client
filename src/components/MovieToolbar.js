import React from 'react'

import '../styles/MovieToolbar.css'

const MovieToolbar = props => {

    const { 
      mode,
      onCancelClick,
      onDeleteClick,
      onUpdateClick
     } = props 
  
    return (
      <div className="MovieToolbar">
        { mode === null 
            ? <React.Fragment>
                <button title="Update" 
                        onClick={ onUpdateClick }>U</button>
                <button title="Delete" 
                        onClick={ onDeleteClick }>D</button>
              </React.Fragment>
            : <button title="Cancel" 
                      onClick={ onCancelClick }>X</button>
        }
      </div>
    )
  }
  
  export default MovieToolbar
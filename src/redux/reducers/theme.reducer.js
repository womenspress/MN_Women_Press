// import events from '../../events'

import { combineReducers } from 'redux';

/* 
  - all themes in store
  - current theme
  - theme staging area ()
*/

const allThemes = (state = [], action) => {
  if (action.type === 'SET_ALL_THEMES') {
  
    return action.payload
  }
  return state
}

const currentTheme = (state = {}, action) => {
  if (action.type === 'SET_CURRENT_THEME') {
      return action.payload
  }
  if(action.type === 'EDIT_CURRENT_THEME'){
    return action.payload
  }
  return state
}


//! staging area, not sure if we'll use

const tempTheme = (state = {}, action) => {
  if (action.type === 'SET_TEMP_THEME') return action.payload
  return state
}


const themeReducer = combineReducers({
  allThemes, currentTheme, tempTheme
})

export default themeReducer
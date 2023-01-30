// import events from '../../events'

import { combineReducers } from 'redux';

/* 
  - all themes in store
  - current theme
  - theme staging area ()
*/

const allContacts = (state = [], action) => {
  if (action.type === 'SET_ALL_CONTACTS') return action.payload
  return state
}

const currentContact = (state = {}, action) => {
  if (action.type === 'SET_CURRENT_CONTACT') return action.payload
  return state
}


//! staging area, not sure if we'll use

const tempContact = (state = {}, action) => {
  if (action.type === 'SET_TEMP_CONTACT') return action.payload
  return state
}


const contactReducer = combineReducers({
  allContacts, currentContact, tempContact
})

export default contactReducer
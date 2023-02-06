// import events from '../../events'

import { combineReducers } from 'redux';
import { DateTime } from 'luxon';

/* 
  - all themes in store
  - current theme
  - theme staging area ()
*/

const allStories = (state = [], action) => {
  if (action.type === 'SET_ALL_STORIES') return action.payload
  return state
}

const currentStory = (state = { rough_draft_deadline: DateTime.now(), final_draft_deadline: DateTime.now().toISO(), publication_date: DateTime.now().toISO() }, action) => {
  if (action.type === 'SET_CURRENT_STORY') return action.payload
  return state
}

const blankStory = {
  rough_draft_deadline: DateTime.now().toISO(), 
  final_draft_deadline: DateTime.now().toISO(), 
  publication_date: DateTime.now().toISO(),
  contacts: [],
  tags: [],
  themes: []
}
//! staging area, not sure if we'll use

const tempStory = (state = blankStory, action) => {
  if (action.type === 'SET_TEMP_STORY') return {...state, ...action.payload}
  if (action.type === 'CLEAR_TEMP_STORY') return blankStory
  return state
}


const storyReducer = combineReducers({
  allStories, currentStory, tempStory
})

export default storyReducer
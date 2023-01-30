// import events from '../../events'

import { combineReducers } from 'redux';

/* 
  - all themes in store
  - current theme
  - theme staging area ()
*/

const allStories = (state = [], action) => {
  if (action.type === 'SET_ALL_STORIES') return action.payload
  return state
}

const currentStory = (state = {}, action) => {
  if (action.type === 'SET_CURRENT_STORY') return action.payload
  return state
}


//! staging area, not sure if we'll use

const tempStory = (state = {}, action) => {
  if (action.type === 'SET_TEMP_STORY') return action.payload
  return state
}


const storyReducer = combineReducers({
  allStories, currentStory, tempStory
})

export default storyReducer
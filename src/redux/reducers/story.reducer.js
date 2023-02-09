// import events from '../../events'

import { combineReducers } from 'redux';
import { DateTime } from 'luxon';

/* 
  - all themes in store
  - current theme
  - theme staging area ()
*/

const storyObject = {
  id: '',
  title: '',
  subtitle: '',
  article_text: '',
  article_link: '',
  notes: '',
  photo: '',
  type: '',
  copies_required: 0,
  copies_sent: false,
  photo_required: false,
  photo_uploaded: false,
  fact_check_required: false,
  fact_check_completed: false,
  graphic_image_required: false,
  graphic_image_completed: false,
  payment_required: false,
  payment_completed: false,
  external_link: '',
  word_count: 0,
  date_added: '',
  rough_draft_deadline: DateTime.now(),
  final_draft_deadline: DateTime.now().toISO(),
  publication_date: DateTime.now().toISO(),
  contacts: [],
  theme: [],
  tags: [],
};

const allStories = (state = [], action) => {
  if (action.type === 'SET_ALL_STORIES') return action.payload;
  return state;
};

const currentStory = (state = storyObject, action) => {
  if (action.type === 'SET_CURRENT_STORY') return action.payload;
  return state;
};

const blankStory = {
  id: '',
  title: '',
  subtitle: '',
  article_text: '',
  article_link: '',
  notes: '',
  photo: '',
  type: '',
  copies_required: false,
  number_of_copies: 0,
  copies_sent: false,
  photo_uploaded: false,
  fact_check_completed: false,
  payment_required: false,
  payment_completed: false,
  socials_required: false,
  socials_completed: false,
  underwriter_required: false,
  underwriter_completed: false,
  photo_submitted: false,
  photo_comments: '',
  external_link: '',
  word_count: 0,
  date_added: '',
  rough_draft_deadline: null,
  final_draft_deadline: null,
  publication_date: null,
  contacts: [],
  theme: [],
  tags: [],
};
//! staging area, not sure if we'll use

const tempStory = (state = blankStory, action) => {
  if (action.type === 'SET_TEMP_STORY') return { ...state, ...action.payload };
  if (action.type === 'CLEAR_TEMP_STORY') return blankStory;
  return state;
};

const storyReducer = combineReducers({
  allStories,
  currentStory,
  tempStory,
});

export default storyReducer;

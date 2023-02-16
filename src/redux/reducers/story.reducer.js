// import events from '../../events'

import { combineReducers } from 'redux';
import { DateTime } from 'luxon';
import { makeStatusColor } from '../../modules/makeStatusColor';


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
  copies_required: false,
  copies_sent: false,
  fact_check_required: false,
  fact_check_completed: false,
  graphic_image_required: false,
  graphic_image_completed: false,
  payment_required: false,
  payment_completed: false,
  photo_submitted: false,
  photo_uploaded: false,
  socials_completed: false,
  socials_required: false,
  underwriter_required: false,
  underwriter_completed: false,
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
  if (action.type === 'SET_ALL_STORIES') {
    const allStories = action.payload;
    for (let story of allStories) {
      story.statusColor = makeStatusColor(story)
    }
    return allStories
  }
  return state;
};

const currentStory = (state = storyObject, action) => {
  if (action.type === 'SET_CURRENT_STORY') {
    const currentStory = action.payload
    currentStory.statusColor = makeStatusColor(currentStory)
    return currentStory
  };
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
  copies_destination: '',
  photo_uploaded: false,
  graphic_image_required: false,
  graphic_image_completed: false,
  fact_check_required: false,
  fact_check_completed: false,
  payment_required: false,
  payment_completed: false,
  socials_required: false,
  socials_completed: false,
  underwriter_required: false,
  underwriter_completed: false,
  photo_submitted: false,
  socials_required: false,
  socials_completed: false,
  underwriter_required: false,
  underwriter_completed: false,
  photo_comments: '',
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

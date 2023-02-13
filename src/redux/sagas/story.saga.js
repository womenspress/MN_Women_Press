import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

/* contact saga needs to handle:
- get all contacts
- get a specific contact
- create a contact
- edit a contact
- delete a contact
*/

function* storySaga() {
  yield takeEvery('GET_ALL_STORIES', getAllStories);
  yield takeEvery('GET_CURRENT_STORY', getCurrentStory);
  yield takeEvery('CREATE_NEW_STORY', createNewStory);
  yield takeEvery('EDIT_STORY', editStory);
  yield takeEvery('UPDATE_STORY_STATUS', updateStoryStatus);
  yield takeEvery('UPDATE_STORY_NOTES', updateStoryNotes);
  yield takeEvery('DELETE_STORY', deleteStory);
  yield takeEvery('CREATE_STORY_TAG', createStoryTag);
  yield takeEvery('DELETE_STORY_TAG', deleteStoryTag);
};

function* getAllStories() {
  try {
    const allStories = yield axios.get('/api/stories');
    yield put({ type: 'SET_ALL_STORIES', payload: allStories.data });
  } catch (error) {
    console.log('error in getAllStories saga:', error)
  }
}

// action.payload is story ID
function* getCurrentStory(action) {
  // console.log('in getCurrentStory, action:', action)
  try {
    const currentStory = yield axios.get(`/api/stories/current/${action.payload}`);
    yield put({ type: 'SET_CURRENT_STORY', payload: currentStory.data });
  } catch (error) {
    console.log('error in getCurrentStory saga:', error);
  }

}

// this function expects a contact object as action.payload
function* createNewStory(action) {
  try {

    if (action.payload.contacts[0]) {
      action.payload.payment_required = !!action.payload.contacts.filter(e => e.invoice_amount > 0);
    } else {
      action.payload.payment_required = false;
    }

    yield axios.post('/api/stories', action.payload);
    yield put({ type: 'GET_ALL_STORIES' });
  } catch (error) {
    console.log('error in createNewStory saga: ', error)
  }
}

// receives entire story object
function* editStory(action) {
  try {
    console.log('in edit story with payload: ', action.payload)
    if (action.payload.contacts[0]) {
      action.payload.payment_required = !!action.payload.contacts.filter(e => e.invoice_amount > 0);
    } else {
      action.payload.payment_required = false;
    }

    yield axios.put(`/api/stories/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_ALL_STORIES' });
    yield put({ type: 'GET_CURRENT_STORY', payload: action.payload.id})
    yield put({type: 'GET_ALL_THEMES'});
  } catch (error) {
    console.log('error in editStory saga:', error)
  }
}

function* updateStoryStatus(action) {
  try {
    yield axios.put(`/api/stories/status/${action.payload.story_id}`, action.payload);
    yield put({ type: 'GET_CURRENT_STORY', payload: action.payload.story_id });
    yield put({ type: 'GET_ALL_STORIES' });
  }
  catch (error) {
    console.log('error in updateStoryStatus saga:', error)
  }
}

// updates only notes part of story
function* updateStoryNotes(action) {
  //action.payload === {storyId: num, notes: 'string'}
  try {
    yield axios.put('/api/stories/notes/' + action.payload.storyId, action.payload);
    yield put({ type: 'GET_CURRENT_STORY', payload: action.payload.storyId })
  } catch (error) {
    console.log('error in updateStoryNotes saga:', error)
  }
}

// payload is only story ID
function* deleteStory(action) {
  try {
    yield axios.delete(`/api/stories/${action.payload}`);
    yield put({ type: 'GET_ALL_STORIES' });
  } catch (error) {
    console.log('error in deleteStory saga:', error);
  }
}

// payload we are receiving will be: {story_id: 'story ID', tag_id: 'tag ID' }
function* createStoryTag(action) {
  try {
    yield axios.post(`/api/stories/tag/${action.payload.story_id}`, action.payload.tag_id);
    yield put({ type: 'GET_CURRENT_STORY', payload: action.payload })
  } catch (error) {
    console.log('error in createStoryTag saga:', error)
  }
}

// payload we are receiving will be: {story_id: 'story ID', tag_id: 'tag ID' }
function* deleteStoryTag(action) {
  try {
    yield axios.delete(`/api/stories/tag/${action.payload.tag_id}/${action.payload.story_id}`);
    yield put({ type: 'GET_CURRENT_STORY', payload: action.payload.story_id });
    yield put({ type: 'GET_ALL_STORIES' });
  } catch (error) {
    console.log('error in deleteStoryTag saga:', error)
  }
}

export default storySaga;
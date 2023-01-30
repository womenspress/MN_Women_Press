import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

/* contact saga needs to handle:
- get all contaacts
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
  yield takeEvery('DELETE_STORY', deleteStory);
  yield takeEvery('CREATE_STORY_TAG', createStoryTag);
  yield takeEvery('DELETE_STORY_TAG', deleteStoryTag);
};

function* getAllStories() {
  const allStories = yield axios.get('/api/stories');
  yield put({type: 'SET_ALL_STORIES', payload: allStories.data});
}

// action.payload is story ID
function* getCurrentStory(action) {
  const currentStory = yield axios.get(`/api/stories/current/${action.payload}`);
  yield put({type: 'SET_CURRENT_STORY', payload: currentStory.data});
}

// this function expects a contact object as action.payload
function* createNewStory(action) {
  yield axios.post('/api/stories', action.payload);
  yield put({type: 'GET_ALL_STORIES'});
}

// receives entire story object
function* editStory(action) {
  yield axios.put(`/api/stories/${action.payload.id}`, action.payload);
  yield put({type: 'GET_ALL_STORIES'});
}

// payload is only story ID
function* deleteStory(action) {
  yield axios.delete(`/api/stories/${action.payload}`);
  yield put({type: 'GET_ALL_STORIES'});
}

// payload we are receiving will be: {story_id: 'story ID', tag_id: 'tag ID' }
function* createStoryTag(action) {
  yield axios.post(`/api/stories/tag/${action.payload.story_id}`, action.payload.tag_id);
  yield put({ type:'GET_CURRENT_STORY', payload: action.payload})
}

// payload we are receiving will be: {story_id: 'story ID', tag_id: 'tag ID' }
function* deleteStoryTag(action) {
  yield axios.delete(`/api/stories/tag/${action.payload.story_id}`, action.payload.tag_id);
  yield put({ type:'GET_CURRENT_STORY', payload: action.payload})
}

export default storySaga;
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
  yield takeEvery('DELETE_STORY', deleteStory)
};

function* getAllStories() {
  const allStories = yield axios.get('/api/stories');
  yield put({type: 'SET_ALL_STORIES', payload: allStories.data});
}

function* getCurrentStory(action) {
  const currentStory = yield axios.get(`/api/stories/current/${action.payload}`);
  yield put({type: 'SET_CURRENT_STORY', payload: currentStory.data});
}

// this function expects a contact object as action.payload
function* createNewStory(action) {
  yield axios.post('/api/stories', action.payload);
  yield put({type: 'GET_ALL_STORIES'});
}

function* editStory(action) {
  yield axios.put(`/api/stories/${action.payload}`);
  yield put({type: 'GET_ALL_STORIES'});
}

function* deleteStory(action) {
  yield axios.delete(`/api/stories/${action.payload}`);
  yield put({type: 'GET_ALL_STORIES'});
}

export default storySaga;
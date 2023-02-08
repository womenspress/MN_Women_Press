import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* tagSaga() {
  yield takeEvery('GET_ALL_TAGS', getAllTags);
  yield takeEvery('CREATE_NEW_TAG', createNewTag);
  yield takeEvery('EDIT_TAG', editTag);
  yield takeEvery('DELETE_TAG', deleteTag);
}

function* getAllTags(action) {
  try {
    const allTags = yield axios.get('/api/tags');
    yield put({ type: 'SET_ALL_TAGS', payload: allTags.data });
  } catch (error) {
    console.log('error in getAllTags:', error);
  }
}

// action.payload is new tag object { name: 'tag name', description: 'tag description' }
function* createNewTag(action) {
  try {
    let response = yield axios.post('/api/tags', action.payload);
    let returningId = response.data.id;
    console.log('ID:', returningId);
    yield put({ type: 'GET_ALL_TAGS' });
  } catch (error) {
    console.log('error in createNewTag saga:', error);
  }
}

// action.payload is tag ID
function* deleteTag(action) {
  try {
    yield axios.delete('/api/tags/' + action.payload);
    yield put({ type: 'GET_ALL_TAGS' });
  } catch (error) {
    console.log('error in story deleteTag saga:', error);
  }
}

// action.payload is complete tag object to be updated
function* editTag(action) {
  try {
    yield axios.put(`/api/tags/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_ALL_TAGS' });
  } catch (error) {
    console.log('error in story editTag saga:', error);
  }
}

export default tagSaga;

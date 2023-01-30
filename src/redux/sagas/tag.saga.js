import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* tagSaga() {
    yield takeEvery('GET_ALL_TAGS', getAllTags);
    yield takeEvery('CREATE_NEW_TAG', createNewTag);
    yield takeEvery('EDIT_TAG', editTag);
    yield takeEvery('DELETE_TAG', deleteTag);
};


function* getAllTags(action) {
    const allTags = yield axios.get('/api/tags');
    yield put({ type: 'SET_ALL_TAGS', payload: allTags.data });
}

// action.payload is new tag object { name: 'tag name', description: 'tag description' }
function* createNewTag(action) {
    yield axios.post('/api/tags', action.payload);
    yield put({ type: 'GET_ALL_TAGS'});
}

// action.payload is tag ID
function* deleteTag(action) {
    yield axios.delete('/api/tags/' + action.payload);
    yield put({ type: 'GET_ALL_TAGS'});
}

// action.payload is complete tag object to be updated
function* editTag(action) {
    yield axios.put(`/api/tags/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_ALL_TAGS'});
}


export default tagSaga;
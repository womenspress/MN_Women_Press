import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

/* theme saga needs to handle:
- get all themes
- get a specific theme

- edit a theme
  - delete theme is secretly an edit

*/



function* themeSaga() {
  yield takeEvery('GET_ALL_THEMES', getAllThemes);
  yield takeEvery('GET_CURRENT_THEME', getCurrentTheme);
  yield takeEvery('DELETE_THEME', emptyTheme);
  yield takeEvery('EDIT_THEME', editTheme);
};

function* getAllThemes(action) {
  const allThemes = yield axios.get('/api/themes');
  yield put({type: 'SET_ALL_THEMES', payload: allThemes.data});
}

//action.payload = id
function* getCurrentTheme(action) {
  const currentTheme = yield axios.get(`/api/themes/current/${action.payload}`);
  yield put({type: 'SET_CURRENT_THEME', payload: currentTheme.data});
}

// router will set all info to null
function* emptyTheme(action) {
  yield axios.put(`/api/themes/delete/${action.payload}`);
  yield put({type: 'GET_ALL_THEMES'});
}

function* editTheme(action) {
  yield axios.put(`/api/themes/edit/${action.payload}`);
  yield put({type: 'GET_ALL_THEMES'});
}

export default themeSaga;
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

/* theme saga needs to handle:
- get all themes
- get a specific theme

- edit a theme
  - delete theme is secretly an edit

*/



function* themeSaga() {
  yield takeEvery('GET_ALL_THEMES', getAllThemes);
  yield takeEvery('GET_CURRENT_THEME', getCurrentTheme);
  yield takeEvery('EDIT_THEME', editTheme);
  yield takeEvery('THEME_STORY_ADD', themeStoryAdd);
};

function* getAllThemes(action) {
  try {
    const allThemes = yield axios.get('/api/themes');
    yield put({ type: 'SET_ALL_THEMES', payload: allThemes.data });
  } catch (error) {
    console.log('error in getAllThemes saga:', error)
  }
}

//action.payload = id
function* getCurrentTheme(action) {
  try {
    const currentTheme = yield axios.get(`/api/themes/current/${action.payload}`);
    yield put({ type: 'SET_CURRENT_THEME', payload: currentTheme.data });
  } catch (error) {
    console.log('error in getCurrentTheme saga:', error)
  }
}

// action.payload is the entire updated theme
function* editTheme(action) {
  try {
    yield axios.put(`/api/themes/edit/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_ALL_THEMES' });
  } catch (error) {
    console.log('error in editTheme saga:', error);
  }
}

function* themeStoryAdd(action) {
  console.log('in theme story add',action);
  try{
    yield axios.post(`/api/themes/themestoryadd`, action.payload);
    yield put({ type: 'GET_ALL_THEMES' });
    console.log('addThemeStory');
  } catch (error){
    console.log('error in themeStoryAdd saga:', error);

  }
  }
  


export default themeSaga;
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

/* contact saga needs to handle:
- get all contaacts
- get a specific contact
- create a contact
- edit a contact
- delete a contact
*/

function* contactSaga() {
  yield takeEvery('GET_ALL_CONTACTS', getAllContacts);
  yield takeEvery('GET_CURRENT_CONTACT', getCurrentContact);
  yield takeEvery('CREATE_NEW_CONTACT', createNewContact);
  yield takeEvery('EDIT_CONTACT', editContact);
  yield takeEvery('DELETE_CONTACT', deleteContact)
};

function* getAllContacts() {
  const allContacts = yield axios.get('/api/contacts');
  yield put({type: 'SET_ALL_CONTACTS', payload: allContacts.data});
}

function* getCurrentContact(action) {
  const currentContact = yield axios.get(`/api/contacts/${action.payload}`);
  yield put({type: 'SET_CURRENT_CONTACT', payload: currentContact.data});
}

// this function expects a contact object as action.payload
function* createNewContact(action) {
  yield axios.post('/api/contacts', action.payload);
  yield put({type: 'GET_ALL_CONTACTS'});
}

function* editContact(action) {
  yield axios.put(`/api/contacts/${action.payload}`);
  yield put({type: 'GET_ALL_CONTACTS'});
}

function* deleteContact(action) {
  yield axios.delete(`/api/contacts/${action.payload}`);
  yield put({type: 'GET_ALL_CONTACTS'});
}

export default contactSaga;
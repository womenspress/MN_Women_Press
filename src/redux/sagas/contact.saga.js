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
  yield takeEvery('DELETE_CONTACT', deleteContact);
  yield takeEvery('CREATE_CONTACT_TAG', createContactTag);
  yield takeEvery('DELETE_CONTACT_TAG', deleteContactTag);
};

function* getAllContacts() {
  const allContacts = yield axios.get('/api/contacts');
  yield put({type: 'SET_ALL_CONTACTS', payload: allContacts.data});
}

function* getCurrentContact(action) {
  const currentContact = yield axios.get(`/api/contacts/current/${action.payload}`);
  yield put({type: 'SET_CURRENT_CONTACT', payload: currentContact.data});
}

// this function expects a contact object as action.payload
function* createNewContact(action) {
  yield axios.post('/api/contacts', action.payload);
  yield put({type: 'GET_ALL_CONTACTS'});
}

// payload is entire contact object
function* editContact(action) {
  yield axios.put(`/api/contacts/${action.payload.id}`, action.payload);
  yield put({type: 'GET_ALL_CONTACTS'});
}

// payload is only ID of contact being deleted
function* deleteContact(action) {
  yield axios.delete(`/api/contacts/${action.payload}`);
  yield put({type: 'GET_ALL_CONTACTS'});
}

// payload we are receiving will be: {contact_id: 'contact ID', tag_id: 'tag ID' }
function* createContactTag(action) {
  yield axios.post(`/api/contacts/tag/${action.payload.contact_id}`, action.payload.tag_id);
  yield put({ type:'GET_CURRENT_CONTACT', payload: action.payload})
}

// payload we are receiving will be: {contact_id: 'contact ID', tag_id: 'tag ID' }
function* deleteContactTag(action) {
  yield axios.delete(`/api/contacts/tag/${action.payload.contact_id}`, action.payload.tag_id);
  yield put({ type:'GET_CURRENT_CONTACT', payload: action.payload})
}

export default contactSaga;
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

/* contact saga needs to handle:
- get all contaacts
- get a specific contact
- create a contact
- edit a contact
- delete a contact
- add a tag
- delete a tag
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
  try {
    const allContacts = yield axios.get('/api/contacts');
    yield put({ type: 'SET_ALL_CONTACTS', payload: allContacts.data });
  } catch (error) {
    console.log('error in getAllContacts saga: ', error);
  }
}

function* getCurrentContact(action) {
  try {
    const currentContact = yield axios.get(`/api/contacts/current/${action.payload}`);
    yield put({ type: 'SET_CURRENT_CONTACT', payload: currentContact.data });
  } catch (error) {
    console.log('error in getCurrentContact saga:', error)
  }
}

// this function expects a contact object as action.payload
function* createNewContact(action) {
  try {
    yield axios.post('/api/contacts', action.payload);
    yield put({ type: 'GET_ALL_CONTACTS' });
  } catch (error) {
    console.log('error in createNewContact saga:', error)
  }
}

// payload is entire contact object
function* editContact(action) {
  try {
    yield axios.put(`/api/contacts/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_ALL_CONTACTS' });
  } catch (error) {
    console.log('error in editContact saga:', error);
  }
}

// payload is only ID of contact being deleted
function* deleteContact(action) {
  try {
    yield axios.delete(`/api/contacts/${action.payload}`);
    yield put({ type: 'GET_ALL_CONTACTS' });
  } catch (error) {
    console.log('error in deleteContact saga:', error);
  }
}

// payload we are receiving will be: {contact_id: 'contact ID', tag_id: 'tag ID' }
function* createContactTag(action) {
  try {
    yield axios.post(`/api/contacts/tag/${action.payload.contact_id}`, action.payload.tag_id);
    yield put({ type: 'GET_CURRENT_CONTACT', payload: action.payload })
  } catch (error) {
    console.log('error in createContactTag saga: ', error);
  }
}

// payload we are receiving will be: {contact_id: 'contact ID', tag_id: 'tag ID' }
function* deleteContactTag(action) {
  try {
    yield axios.delete(`/api/contacts/tag/${action.payload.contact_id}/${action.payload.tag_id}`);
    yield put({ type: 'GET_ALL_CONTACTS'})
  } catch (error) {
    console.log('error in deleteContactTag saga:', error);
  }
}

export default contactSaga;
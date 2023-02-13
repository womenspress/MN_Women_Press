import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import ContactListItem from '../../components/ContactListItem/ContactListItem';
import CreateNewContactModal from '../../components/CreateNewContactModal/CreateNewContactModal';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'

import { mainContentBox } from '../../__style';

export default function ContactsPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(store => store.contacts.allContacts)

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CONTACTS' });
    dispatch({type: "GET_ALL_TAGS"});
  }, [])


  //* ===================== SORT/FILTER/SEARCH ===============================
  const sortOptions = ['name','date added',  'last contribution']
  const [sortMethod, setSortMethod] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const searchByOptions = ['all', 'contact info', 'tag', 'role', 'story']

  const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()

  const sortResults = (arr) => {
    switch (sortMethod) {
      case 'date added':
        return arr
      case 'name':
        return arr.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      case 'last contribution':
        return arr
      default:
        return arr
    }

  }

  const searchResults = (arr) => {

    function getContactString(contact) {
      return contact.name.toLowerCase() + contact.expertise?.toLowerCase() + contact.bio?.toLowerCase() + contact.note?.toLowerCase()
    }

    function getTagsString(contact) {
      const tagsNameString = contact.tags?.map(tag => tag?.name?.toLowerCase()).join('');
      const tagsDescString = contact.tags?.map(tag => tag?.description?.toLowerCase()).join('')
      return tagsNameString + tagsDescString
    }

    function getRolesString(contact) {
      return contact.roles?.map(role => role.name?.toLowerCase()).join('');
    }

    function getStoryString(contact) {
      return contact.stories?.map(story => story.title?.toLowerCase()).join('');

    }

    switch (searchBy) {
      case 'contact info':
        return arr.filter(contact => getContactString(contact).includes(searchTerm.toLowerCase()))
      case 'tag':
        return arr.filter(contact => getTagsString(contact).includes(searchTerm.toLowerCase()))
      case 'role':
        return arr.filter(contact => getRolesString(contact).includes(searchTerm.toLowerCase()))
      case 'story':
        return arr.filter(contact => getStoryString(contact).includes(searchTerm.toLowerCase()))
      case 'all':
        return arr.filter(contact => getContactString(contact).includes(searchTerm.toLowerCase()) || getTagsString(contact).includes(searchTerm.toLowerCase()) || getRolesString(contact).includes(searchTerm.toLowerCase()) || getStoryString(contact).includes(searchTerm.toLowerCase()))
      default:
        return arr
    }

  }

  const contactResults = sortResults(ascDesc(searchResults(contacts)))

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginX: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" component="h1">
            Contacts
          </Typography>
          <CreateNewContactModal />
        </Box>
          <SortFilterSearch
            sortOptions={sortOptions}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            searchByOptions={searchByOptions}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
      </Box>
      <Box sx={{ ...mainContentBox, height: 700, overflow: 'hidden', overflowY: 'scroll' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        </Box>
        <Grid container space={1}>
          {contactResults.map((contact) => {
            return (
              <Grid item xs={12} key={contact.id}>
                <ContactListItem contact={contact} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}
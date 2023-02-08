import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import ContactListItem from '../../components/ContactListItem/ContactListItem';
import CreateNewContactModal from '../../components/CreateNewContactModal/CreateNewContactModal';

import { mainContentBox } from '../../__style';

export default function ContactsPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(store => store.contacts.allContacts)

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CONTACTS' });
  }, [])

  const sortOptions = ['date', 'name', 'last contribution']
  const filterOptions = ['role']


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h3" component="h1">
          Contacts
        </Typography>
        <CreateNewContactModal />
      </Box>
      <Box sx = {{...mainContentBox, height: 700, overflow: 'hidden', overflowY: 'scroll'}}>
        <Grid container space={1}>
          {contacts.map((contact) => {
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
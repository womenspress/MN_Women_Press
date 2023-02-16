import React, { useState } from 'react';

// libraries
import { DateTime } from 'luxon'

// components
import { Box, Card, CardActions, CardContent, Typography, Modal } from '@mui/material';
import ThemeModal from '../ThemeModal/ThemeModal';

// internal
import { largeModal} from '../../__style';



export default function BasicCard(props) {
  let theme = props.theme;
  let id = props.theme.id;
  let name = props.theme.name;
  let description = props.theme.description;
  let month = props.theme.month;
  let year = props.theme.year;
  let stories = filterNullStories(props.theme.stories);
  let contacts = filterNullContacts(props.theme.contacts);

  // filter null values from stories & story contact, and story contact object information
  function filterNullContacts(contacts) {
    return contacts.filter(x => x != null && x.id != null);
  }

  function filterNullStories(stories) {
    return stories.filter(x => x != null && x.id != null);
  }

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card sx={{ width: '100%', height: 200, cursor: 'pointer' }} onClick={() => setModalOpen(true)}>
        <CardContent>
          <Box sx={{
            height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', overflowY: 'scroll', overflowX: 'scroll', '&::-webkit-scrollbar': {
              width: 0,
            }
          }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ textAlign: 'left' }}>
                  {name}
                </Typography>
                <Typography sx={{ fontSize: 14, marginLeft: 1 }} color="text.secondary" gutterBottom>
                  {DateTime.fromISO(theme.month_year).toFormat('MMMM')}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ textAlign: 'left', fontSize: 13 }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <CardActions>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Box sx={{ ...largeModal, padding: 4 }}>
            <ThemeModal
              theme={theme}
              id={id}
              name={name}
              description={description}
              month={month}
              year={year}
              stories={stories}
              contacts={contacts}
            />
          </Box>
        </Modal>

      </CardActions>
    </>
  );
}
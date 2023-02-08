import React, { useState, useEffect } from 'react';

// libraries
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon'

// components
import { Box, Button, Typography, TextField, Grid, Autocomplete } from '@mui/material';
import ThemeStoryListItem from '../ThemeStoryListItem/ThemeStoryListItem';
import ThemeContactListItem from '../ThemeContactListItem/ThemeContactListItem';

// internal
// import { largeModal, smallModal } from '../../__style';


export default function ThemeModal(props) {
  const dispatch = useDispatch();

  let theme = props.theme;
  let id = props.id || -1;
  let name = props.name || "undefined";
  let description = props.description || "undefined description";
  let stories = props.stories || [{ id: -1, title: "title not found", subtitle: "bugs", article_text: "beans", notes: "worms" }];
  let contacts = props.contacts || [{ id: -1, name: "contact not found", pronouns: 'she/they/them', expertise: "ice skating and catching butterflies", bio: "extreme mountain climber", note: "perfect photo dance session" }];


  const storiesIds = stories ? stories?.map(story => story?.id) : [];
  const allContacts = useSelector(store => store.contacts.allContacts);
  const allStories = useSelector(store => store.stories.allStories);

  const [contactToAdd, setContactToAdd] = useState({ id: 0, label: '' })


  // story options: all available stories that are not already in the theme, bundled up for rendering in the autocomplete
  const storyOptions = allStories.filter(story => !storiesIds.includes(story.id)).map(story => { return { id: story.id, label: story.name } })

  // secondary theme stow edited values
  const [editValues, setEditValues] = useState(theme);

  // edit, save, cancel function
  const [edit, setEdit] = useState(false);

  // sends current_theme to reducer
  const activateEdit = () => {
    // dispatch({ type: 'SET_CURRENT_THEME', payload: { editTheme } })
    setEdit(true);
  }

  // cancels edits and resets current theme reducer to original value
  const cancelEdit = () => {
    setEdit(false);
    setEditValues(theme)
  }

  // dispatches edited theme to current theme reducer
  const activateSave = () => {
    console.log('activate save');
    dispatch({ type: 'EDIT_CURRENT_THEME', payload: editValues })
    dispatch({ type: 'EDIT_THEME', payload: editValues })
    console.log('close edit mode');
    setEdit(false);
    // dispatch {id: id, name: name, month: month, year: year, description: description}
  }

  /* 
      SEARCH STORY FUNCTION: 
      user input text into search, 
      referenced array is filtered against text input, 
      return all array item that contain text.
  */
  const [searchStoryText, setSearchStoryText] = React.useState("");
  const [filteredStoriesArray, setFilteredStoryArray] = React.useState(stories);

  React.useEffect(() => {
    // setFilteredStoryArray(stories.filter(function(obj) {
    //         if (
    //             obj.title?.includes(searchStoryText) || 
    //             obj.subtitle?.includes(searchStoryText) || 
    //             obj.article_text?.includes(searchStoryText) ||
    //             obj.notes?.includes(searchStoryText)
    //             ){
    //             console.log('passed filter:', obj);
    //             return obj;
    //         }
    //     }
    // ))
  }, [searchStoryText]);

  // search contact function
  const [searchContactText, setSearchContactText] = React.useState("");
  const [filteredContactsArray, setFilteredContactsArray] = React.useState(contacts);

  React.useEffect(() => {
    // setFilteredContactsArray(contacts.filter(function(obj) {
    //         if (
    //             obj.name?.includes(searchContactText) || 
    //             obj.pronouns?.includes(searchContactText) || 
    //             obj.expertise?.includes(searchContactText) ||
    //             obj.bio?.includes(searchContactText) ||
    //             obj.note?.includes(searchContactText)
    //             ){
    //             console.log('passed filter:', obj);
    //             return obj;
    //         }
    //     }
    // ))
  }, [searchContactText]);

  const handleStorySubmit = (e) => {
    e.preventDefault;
    console.log('submitting story')
    dispatch({ type: 'ADD_STORY_TO_THEME', })
  }

  return (
    <>
      <Box sx={{ marginX: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* {JSON.stringify(theme)} */}
          {edit ? <TextField
            sx={{ mt: 2, width: 1 }}
            id="outlined-basic"
            label="Theme Name"
            variant="outlined"
            onChange={(event) => setEditValues({ ...editValues, name: event.target.value })}
            value={editValues.name}
          /> :
            <Typography id="modal-modal-title" variant="h3" component="h2">
              {name}
            </Typography>
          }
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {DateTime.fromISO(theme.month_year).toFormat('MMMM, yyyy')}
          </Typography>

        </Box>
        {edit ?
          <TextField
            sx={{ mt: 2, width: 1 }}
            id="outlined-textarea"
            label="Theme Description"
            placeholder="Description"
            onChange={(event) => setEditValues({ ...editValues, description: event.target.value })}
            value={editValues.description}
            multiline
          />
          :
          <Typography id="modal-modal-description" sx={{ mt: 2, width: 1 }}>
            {description}
          </Typography>
        }

        <Box>

          {edit ?
            <>
              <Button onClick={activateSave}>Save</Button>
              <Button onClick={cancelEdit}>Cancel</Button>
            </>
            :
            <Button onClick={activateEdit}>Edit</Button>
          }
        </Box>
      </Box>
      {/* //* ================ stories ============== */}

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, width: .25 }}
              variant="h4" component="h4"
            >
              Stories:
            </Typography>
            <form onSubmit={handleStorySubmit}>
              <Box sx={{ display: 'flex' }}>
                <Autocomplete
                  size='small'
                  sx={{ width: 200 }}
                  options={storyOptions}
                  renderInput={(params) => <TextField {...params} size='small' label='story' />}
                  value={contactToAdd}
                />
                <Button
                  type='submit'
                >add</Button>
              </Box>
            </form>
          </Box>

          {filteredStoriesArray.map((story, index) => {
            return (
              <ThemeStoryListItem story={story} key={index} />
            )
          })}

        </Grid>
        <Grid item xs={6}>
          {/* //* ================ contacts ============== */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, width: .25 }}
              variant="h4" component="h4"
            >
              Contacts:
            </Typography>
            <Autocomplete
              size='small'
              sx={{ width: 200 }}
              options={allContacts.map(contact => contact.name)}
              renderInput={(params) => <TextField {...params} size='small' label='contact' />}
            />

          </Box>
          {filteredContactsArray.map((contact, index) => {
            return (
              <ThemeContactListItem contact={contact} key={index} />
            )
          })}
          {/* </Box> */}</Grid>
        {/* </Modal> */}</Grid>
    </>
  );
}
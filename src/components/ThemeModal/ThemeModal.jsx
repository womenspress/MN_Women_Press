import React, { useState, useEffect } from 'react';

// libraries
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon'

// components
import { Box, Button, Typography, TextField, Grid, Autocomplete } from '@mui/material';
import ThemeStoryListItem from '../ThemeStoryListItem/ThemeStoryListItem';
import ThemeContactListItem from '../ThemeContactListItem/ThemeContactListItem';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'

// styling
import { largeModal, mainContentBox } from '../../__style'


export default function ThemeModal(props) {
  const dispatch = useDispatch();

  let theme = props.theme;
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
  const [themeStoriesArray, setFilteredStoryArray] = React.useState(stories || []);

  const handleStorySubmit = (e) => {
    e.preventDefault;
    console.log('submitting story')
    dispatch({ type: 'ADD_STORY_TO_THEME', })
  }

    //* ============ SORT/FILTER/SEARCH STUFF ===============

    const sortOptions = ['date added', 'title']
    const [sortMethod, setSortMethod] = useState('date added');
    const [sortDirection, setSortDirection] = useState('ascending')
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('all');
    const searchByOptions = ['all', 'story info'] //['all', 'story info', 'theme', 'tag', 'contact']
  
  
    const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()
  
    const sortResults = (arr) => {
      switch (sortMethod) {
        case 'date added':
          return arr.sort((a, b) => {
            if (DateTime.fromISO(a.date_added) > DateTime.fromISO(b.date_added)) return 1
            if (DateTime.fromISO(a.date_added) < DateTime.fromISO(b.date_added)) return -1
            else return 0
          })
        case 'title':
          return arr.sort((a, b) => {
            if (a.title > b.title) return 1
            if (a.title < b.title) return -1
            else return 0
          })
        default:
          return arr;
      }
    }
  
    // const searchByOptions = ['all', 'theme', 'tag', 'contact', 'story info']
    const searchResults = (arr) => {
      function getContactsString(story) {
        return story.contacts.map(contact => contact?.name.toLowerCase()).join('')
      }
  
      function getTagsString(story) {
        const tagsNameString = story.tags?.map(tag => tag?.name?.toLowerCase()).join('');
        const tagsDescString = story.tags?.map(tag => tag?.description?.toLowerCase()).join('')
        return tagsNameString + tagsDescString
      }
  
      function getThemesString(story) {
        const themesNameString = story.theme?.map(theme => theme?.title?.toLowerCase()).join('');
        const themesDescString = story.theme?.map(theme => theme?.description?.toLowerCase()).join('');
        return themesNameString + themesDescString
      }
  
      switch (searchBy) {
        // case 'contact':
        //   return arr.filter(story => getContactsString(story).includes(searchTerm.toLowerCase()))
        case 'story info':
          return arr.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
        // case 'theme':
        //   return arr.filter(story => getThemesString(story).includes(searchTerm.toLowerCase()))
        // case 'tag':
        //   return arr.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()))
        case 'all':
          return arr.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())|| story.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
        default:
          return arr
      }
    }

    const storyResults = ascDesc(sortResults(searchResults(themeStoriesArray)))

  return (
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
      {/* //* ================ stories ============== */}
          {/* Search and add to theme method for stories */}
          <Box sx={{bgcolor: 'grey.100', borderRadius: 2, px: 2, py: 1 }}>
            <Box sx={{ display: 'flex', width: 1}}>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, width: .5 }}
                variant="h4" component="h4"
              >
                Stories:
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: .5 }}>
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
            </Box>
            <Box sx={{overflow: 'hidden', overflowY: 'scroll' }}>
              {storyResults.length ? storyResults.map((story,index) => {
                return (
                  <ThemeStoryListItem story={story} key={index} />
                )
              })
                :
                <></>
              }
            </Box>
          </Box>
          {/* {themeStoriesArray.map((story, index) => {
            return (
              <ThemeStoryListItem story={story} key={index} />
            )
          })} */}
          {/* //* ================ contacts ============== */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, width: .25 }}
              variant="h4" component="h4"
            >
              Contacts:
            </Typography>

            {/* Search Contacts and add it to the theme */}
            {/* <Autocomplete
              size='small'
              sx={{ width: 200 }}
              options={allContacts.map(contact => contact.name)}
              renderInput={(params) => <TextField {...params} size='small' label='contact' />}
            /> */}

          </Box>
          {contacts.map((contact, index) => {
            return (
              <ThemeContactListItem contact={contact} key={index} />
            )
          })}
    </Box>
  );
}
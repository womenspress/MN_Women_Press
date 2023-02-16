import React, { useState } from 'react';

// libraries
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon'

// mui components
import { Box, Button, Typography, TextField, Modal } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

//components
import StoryListItem from '../../components/StoryListItem/StoryListItem'
import ContactListItem from '../../components/ContactListItem/ContactListItem';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch';
import AddStoryToTheme from '../../assets/AddStoryToTheme/AddStoryToTheme';
import StoryCreateEditModal from '../StoryCreateEditModal/StoryCreateEditModal';


// styling
import { largeModal } from '../../__style'


export default function ThemeModal(props) {
  const dispatch = useDispatch();

  const theme = props.theme;
  let name = props.name || "undefined";
  let description = props.description || "undefined description";
  let stories = props.stories || [{ id: -1, title: "title not found", subtitle: "bugs", article_text: "beans", notes: "worms" }];
  let contacts = props.contacts || [{ id: -1, name: "contact not found", pronouns: 'she/they/them', expertise: "ice skating and catching butterflies", bio: "extreme mountain climber", note: "perfect photo dance session" }];
  const storiesIds = stories ? stories?.map(story => story?.id) : [];
  const allContacts = useSelector(store => store.contacts.allContacts);
  const allStories = useSelector(store => store.stories.allStories);
  const themeStoriesArray = stories || [];

  const zipStoryArray = themeStoriesArray.map(story => {
    if (!story || story === null) { return }
    for (let newStory of allStories) {
      if (story?.id === newStory.id) {
        return newStory;
      }
    }
  })

  // story options: all available stories that are not already in the theme, bundled up for rendering in the autocomplete
  const storyOptions = allStories.filter(story => !storiesIds.includes(story.id)).map(story => { return { id: story.id, label: story.title } })

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
    dispatch({ type: 'EDIT_CURRENT_THEME', payload: editValues })
    dispatch({ type: 'EDIT_THEME', payload: editValues })
    setEdit(false);
    // dispatch {id: id, name: name, month: month, year: year, description: description}
  }
  // Story edit modal
  const [step, setStep] = useState('general')
  const [createMode, setCreateMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const modalDimensions = step === 'general' ? { height: 600, width: 700 } : { height: 600, width: 900 }


  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }




  /* 
      SEARCH STORY FUNCTION: 
      user input text into search, 
      referenced array is filtered against text input, 
      return all array item that contain text.
  */


  //* ============ Story: SORT/FILTER/SEARCH STUFF ===============

  const sortOptions = ['date added', 'title']
  const [sortMethod, setSortMethod] = useState('date added');
  const [sortDirection, setSortDirection] = useState('ascending')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const searchByOptions = ['all', 'story info', 'theme', 'tag', 'contact']


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
      const tagsNameString = story?.tags?.map(tag => tag?.name?.toLowerCase()).join('');
      const tagsDescString = story?.tags?.map(tag => tag?.description?.toLowerCase()).join('')
      return tagsNameString + tagsDescString
    }

    function getThemesString(story) {
      const themesNameString = story.theme?.map(theme => theme?.title?.toLowerCase()).join('');
      const themesDescString = story.theme?.map(theme => theme?.description?.toLowerCase()).join('');
      return themesNameString + themesDescString
    }

    switch (searchBy) {
      case 'contact':
        return arr.filter(story => getContactsString(story).includes(searchTerm.toLowerCase()))
      case 'story info':
        return arr.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'theme':
        return arr.filter(story => getThemesString(story).includes(searchTerm.toLowerCase()))
      case 'tag':
        return arr.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()))
      case 'all':
        return arr.filter(story => getTagsString(story)?.includes(searchTerm.toLowerCase()) || story.theme[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) || story.theme[0]?.description.toLowerCase().includes(searchTerm.toLowerCase()) || story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || getContactsString(story).includes(searchTerm.toLowerCase()))
      default:
        return arr
    }
  }

  const storyResults = ascDesc(sortResults(searchResults(zipStoryArray)))

  //* ============ Contact: SORT/FILTER/SEARCH STUFF ===============

  const sortOptionsContacts = ['date added', 'name', 'most recent contribution'];
  const [sortMethodContacts, setSortMethodContacts] = useState('date added');
  const [sortDirectionContacts, setSortDirectionContacts] = useState('ascending');

  const [searchTermContacts, setSearchTermContacts] = useState('');
  const [searchByContacts, setSearchByContacts] = useState('all');
  const searchByOptionsContacts = ['all', 'contact info', 'tag', 'role', 'story'];

  const ascDescContacts = (arr) => { return (sortDirectionContacts === 'ascending' ? arr : arr.reverse()) };

  const sortResultsContacts = (arr) => {
    switch (sortMethodContacts) {
      case 'date added':
        return arr.sort((a, b) => {
          if (DateTime.fromISO(a.date_added) > DateTime.fromISO(b.date_added)) return 1
          if (DateTime.fromISO(a.date_added) < DateTime.fromISO(b.date_added)) return -1
          else return 0
        })
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
      case 'most recent contribtuion':
        return arr.sort((a, b) => {
          if (DateTime.fromISO(a.stories[0].date_added) > DateTime.fromISO(b.stories[0].date_added)) return 1
          if (DateTime.fromISO(a.stories[0].date_added) < DateTime.fromISO(b.stories[0].date_added)) return -1
          else return 0
        })
      default:
        return arr
    }

  }

  const searchResultsContacts = (arr) => {

    function getContactString(contact) {
      return contact.name.toLowerCase() + contact?.expertise?.toLowerCase() + contact?.bio?.toLowerCase() + contact.note?.toLowerCase()
    }

    function getContactTagString(contact) {
      const tagsNameString = contact.tags?.map(tag => tag?.name?.toLowerCase()).join('');
      const tagsDescString = contact.tags?.map(tag => tag?.description?.toLowerCase()).join('')
      return tagsNameString + tagsDescString
    }

    function getContactRolesString(contact) {
      return contact.roles?.map(role => role.name?.toLowerCase()).join('');
    }

    function getContactStoriesString(contact) {
      return contact.stories?.map(story => story.title?.toLowerCase()).join('');

    }

    switch (searchByContacts) {
      case 'contact info':
        return arr.filter(contact => getContactString(contact).includes(searchTermContacts.toLowerCase()))
      case 'tag':
        return arr.filter(contact => getContactTagString(contact).includes(searchTermContacts.toLowerCase()))
      case 'role':
        return arr.filter(contact => getContactRolesString(contact).includes(searchTermContacts.toLowerCase()))
      case 'story':
        return arr.filter(contact => getContactStoriesString(contact).includes(searchTermContacts.toLowerCase()))
      case 'all':
        return arr.filter(contact => getContactString(contact).includes(searchTermContacts.toLowerCase()) || getContactTagString(contact).includes(searchTermContacts.toLowerCase()) || getContactRoleString(contact).includes(searchTermContacts.toLowerCase()) || getContactStoriesString(contact).includes(searchTermContacts.toLowerCase()))
      default:
        return arr
    }

  }

  // compares the theme contacts and allContacts; return allContact with same contact.id
  const zipContactArray = contacts.map(contact => {
    for (let newContact of allContacts) {
      if (contact.id === newContact.id) {
        return newContact;
      }
    }
  }
  )


  const contactResults = ascDescContacts(sortResultsContacts(searchResultsContacts(zipContactArray)))


  // page story / contacts
  const [page, setPage] = useState('stories');

  return (
    <div>
      <Box sx={{ height: 64, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        {edit ? <TextField
          sx={{ width: .75 }}
          id="outlined-basic"
          label="Theme Name"
          variant="outlined"
          onChange={(event) => setEditValues({ ...editValues, name: event.target.value })}
          value={editValues.name}
        /> :
          <Typography id="modal-modal-title" variant="h3" component="h1">
            {name}
          </Typography>
        }
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {DateTime.fromISO(theme.month_year).toFormat('MMMM, yyyy')}
        </Typography>

      </Box>
      {edit ?
        <TextField
          sx={{ width: 1 }}
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
      <Box sx={{ marginBottom: 2 }}>

        {edit ?
          <>
            <Button onClick={activateSave}>Save</Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </>
          :
          <Button onClick={activateEdit}>Edit</Button>
        }
      </Box>

      {/* Search and add to theme method for stories */}
      <Box sx={{ display: 'flex', bgcolor: 'white' }}>
        <Typography sx={{ px: 1, cursor: "pointer", mr: 1 }} color={page === "stories" ? "primary" : "black"} variant="h5" component="h4" onClick={() => setPage('stories')}>
          Stories
        </Typography>
        <Typography sx={{ px: 1, cursor: "pointer" }} color={page === "contacts" ? "primary" : "black"} variant="h5" component="h5" onClick={() => setPage('contacts')}>
          Contacts
        </Typography>
      </Box>
      {page === 'stories' &&
        <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AddStoryToTheme theme={theme} options={storyOptions} />
            </Box>
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
          <Box sx={{ height: "430px", alignItems: 'center', overflow: 'hidden', overflowY: 'scroll', overflowX: 'scroll' }}>
            <Box sx={{ overflow: 'hidden', overflowY: 'scroll' }}>
              {storyResults.length ? storyResults.map((story, index) => {
                return (
                  <StoryListItem
                    key={index}
                    story={story}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setModalOpen={setModalOpen}
                  />
                )
              })
                :
                <></>
              }
            </Box>
          </Box>
          <Modal
            open={modalOpen}
            onClose={handleClose}>
            <Box sx={{ ...largeModal, height: modalDimensions.height, width: modalDimensions.width }}>
              <StoryCreateEditModal setModalOpen={setModalOpen} createMode={createMode} setCreateMode={setCreateMode} step={step} setStep={setStep} />
            </Box>
          </Modal>
        </Box>
      }
      {/* //* ================ contacts ============== */}
      {page === 'contacts' &&

        <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
            <Box sx={{ display: 'flex' }}>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: .5 }}>
              <SortFilterSearch
                sortOptions={sortOptionsContacts}
                sortMethod={sortMethodContacts}
                setSortMethod={setSortMethodContacts}
                sortDirection={sortDirectionContacts}
                setSortDirection={setSortDirectionContacts}
                searchByOptions={searchByOptionsContacts}
                searchBy={searchByContacts}
                setSearchBy={setSearchByContacts}
                searchTerm={searchTermContacts}
                setSearchTerm={setSearchTermContacts}
              />
            </Box>
          </Box>
          <Box sx={{ height: "430px", alignItems: 'center', overflow: 'hidden', overflowY: 'scroll', overflowX: 'scroll' }}>
            <Box sx={{ alignItems: 'center', overflow: 'hidden', overflowY: 'scroll', overflowX: 'scroll' }}>
              {contactResults.map((contact, index) => {
                return (
                  <ContactListItem contact={contact} key={index} numOfDisplay={2} />
                )
              })}
            </Box>
          </Box>
        </Box>
      }
    </div>
  );
}
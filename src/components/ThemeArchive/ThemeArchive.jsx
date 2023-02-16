import React, { useState } from 'react'

// libraries
import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch';

// components
import { Box, Typography, Grid, Modal } from '@mui/material';
import ArchiveThemeCard from '../../assets/ArchiveThemeCard/ArchiveThemeCard';
import StoryListItem from '../StoryListItem/StoryListItem';
import ContactListItem from '../ContactListItem/ContactListItem';
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';
import { largeModal } from '../../__style'


export default function ThemeArchive() {



  const sortOptions = ['date published', 'title',]
  const [sortMethod, setSortMethod] = useState('date published');
  const [sortDirection, setSortDirection] = useState('ascending')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const searchByOptions = ['all', 'theme name', 'contact name', 'story title', 'description']

  const allThemes = useSelector(store => store.themes.allThemes).filter(theme => theme.name != ' ');
  const [selectedTheme, setSelectedTheme] = useState({ stories: [] })
  const archiveThemes = Array.isArray(allThemes) && allThemes.length ? allThemes.filter(theme => Date.parse(theme.month_year) < DateTime.now()) : [];
  const allStories = useSelector(store => store.stories.allStories);

  //grabs unique contacts, then sorts them alphabetically
    let themeContacts = [...new Set(selectedTheme?.contacts)];
    themeContacts.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  



  const zipStoryArraysOfSelectedTheme = selectedTheme.stories.map(story => {
    if (!story || story === null) { return }
    for (let newStory of allStories) {
      if (story?.id === newStory.id) {
        return newStory
      }
    }
  })

  const sortResults = (arr) => {
    let outputArray = arr
    if (sortDirection === 'descending') outputArray = arr.reverse();

    switch (sortMethod) {
      case 'date published':
        return outputArray.sort((a, b) => {
          if (DateTime.fromObject({ month: a.month, year: a.year }) > DateTime.fromObject({ month: b.month, year: b.year })) return -1
          if (DateTime.fromObject({ month: a.month, year: a.year }) < DateTime.fromObject({ month: b.month, year: b.year })) return 1
          else return 0
        })
      case 'title':
        return outputArray.sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          else return 0
        })
      default:
        return outputArray;
    }
  }

  // all, theme name, contact, story title, description
  const searchResults = (arr) => {


    function getContactsString(theme) {
      return theme.contacts?.map(contact => contact?.name.toLowerCase()).join('')
    }

    // story title and notes
    function getStoriesString(theme) {
      const titlesString = theme.stories?.map(story => story?.title.toLowerCase()).join('')
      const notesString = theme.stories?.map(story => story?.notes.toLowerCase()).join('')
      return titlesString + notesString
    }

    switch (searchBy) {
      case 'theme name':
        return arr.filter(theme => theme.name.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'contact name':
        return arr.filter(theme => getContactsString(theme).includes(searchTerm.toLowerCase()))
      case 'story title':
        return arr.filter(theme => getStoriesString(theme).includes(searchTerm.toLowerCase()))
      case 'description':
        return arr.filter(theme => theme.description.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'all':
        return arr.filter(theme => theme.name.toLowerCase().includes(searchTerm.toLowerCase()) || theme.description.toLowerCase().includes(searchTerm.toLowerCase()) || getContactsString(theme).includes(searchTerm.toLowerCase()) || getStoriesString(theme).includes(searchTerm.toLowerCase()) || theme.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

  }

  //! set to all themes temporarily. eventually, set to archiveThemes
  const themeResults = sortResults(searchResults(archiveThemes))


  // edit and delete function/variables here:
  const [step, setStep] = useState('general')
  const modalDimensions = step === 'general' ? { height: 600, width: 700 } : { height: 600, width: 900 }
  const [createMode, setCreateMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
      <Grid container spacing={1}>
        <Grid item xs={4} sx={{ height: 600, overflow: 'hidden', overflowY: 'scroll' }}>
          {themeResults?.map((theme, index) => {
            return (
              <ArchiveThemeCard key={index} theme={theme} setSelectedTheme={setSelectedTheme} />
            )
          })}
        </Grid>
        <Grid item xs={4} sx={{ height: 600, overflow: 'hidden', overflowY: 'scroll' }}>
          {selectedTheme &&
            <Box>
              <Typography variant='h6'>stories</Typography>
              {selectedTheme != {} && zipStoryArraysOfSelectedTheme.map(story => {
                return (
                  <StoryListItem key={story?.title} story={story} createMode={createMode} setCreateMode={setCreateMode} setModalOpen={setModalOpen} removeDelete={true} compactMode={true} />
                )
              })}
            </Box>
          }
        </Grid>
        <Grid item xs={4} sx={{ height: 600, overflow: 'hidden', overflowY: 'scroll' }}>
          {selectedTheme &&
            <Box key={selectedTheme?.id}>
              <Typography variant='h6'>contacts</Typography>
              {themeContacts.map(contact => {

                return (
                  contact && <ContactListItem compact key={contact.name} contact={contact}/>
                )
              })}
            </Box>
          }
        </Grid>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={handleClose}>
        <Box sx={{ ...largeModal, height: modalDimensions.height, width: modalDimensions.width }}>
          <StoryCreateEditModal setModalOpen={setModalOpen} createMode={createMode} setCreateMode={setCreateMode} step={step} setStep={setStep} />
        </Box>
      </Modal>
    </Box>
  )
}

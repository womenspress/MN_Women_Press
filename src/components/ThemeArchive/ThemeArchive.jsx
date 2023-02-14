import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch';

// components
import { Box, Typography, Grid, Modal } from '@mui/material';
import ThemeCard from '../ThemeCard/ThemeCard';
import ArchiveThemeCard from '../../assets/ArchiveThemeCard/ArchiveThemeCard';
import StoryListItem from '../StoryListItem/StoryListItem';
import ContactListItem from '../ThemeContactListItem/ThemeContactListItem';
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
  const [selectedTheme, setSelectedTheme] = useState({stories: []})
  // console.log(allThemes[0]);
  const archiveThemes = Array.isArray(allThemes) && allThemes.length ? allThemes.filter(theme => Date.parse(theme.month_year) < DateTime.now()) : [];
  const allStories = useSelector(store => store.stories.allStories);
  // console.log('allStories', allStories);
  const selectedThemeStories = allStories;
  // console.log(selectedThemeStories);

  const zipStoryArraysOfSelectedTheme = selectedTheme.stories.map(story => {
    // console.log(story);
    if(!story || story === null){return}
    for(let newStory of allStories){
      if(story?.id === newStory.id){
        // console.log(newStory);
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
        break;
      case 'title':
        return outputArray.sort((a, b) => {
          if (a.name > b.name) return -1
          if (a.name < b.name) return 1
          else return 0
        })
        break;
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
  const themeResults = sortResults(searchResults(allThemes))


  // edit and delete function/variables here:
  const [step, setStep] = useState('general')
  const modalDimensions = step === 'general' ? { height: 600, width: 700 } : { height: 600, width: 900 }
  const [createMode, setCreateMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })


  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  return (
    <Box>
      {/* <p>{JSON.stringify(archiveThemes)}</p>
      <p>{Date.now()}</p>
      <p>{Date.parse(allThemes[0].month_year)}</p> */}
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
                  <StoryListItem key={story?.title} story={story} createMode={createMode} setCreateMode={setCreateMode} setModalOpen={setModalOpen}  removeDelete={true}/>
                )
              })}
            </Box>
          }
        </Grid>
        <Grid item xs={4} sx={{ height: 600, overflow: 'hidden', overflowY: 'scroll' }}>
          {selectedTheme &&
            <Box>
              <Typography variant='h6'>contacts</Typography>

              {selectedTheme.contacts?.map(contact => {

                return (
                  contact && <ContactListItem key={contact.name} contact={contact}/>
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

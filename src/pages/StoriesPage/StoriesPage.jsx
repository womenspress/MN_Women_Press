import React, { useEffect, useState } from 'react';

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon'

// components
import StoryListItem from '../../components/StoryListItem/StoryListItem'
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Button, IconButton, Typography, Modal } from '@mui/material';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'

// internal
import { largeModal, mainContentBox } from '../../__style'
// import { story } from '../../sampleData';

export default function StoriesPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ALL_STORIES' })
    dispatch({ type: 'GET_ALL_CONTACTS' })
    dispatch({ type: 'GET_ALL_THEMES' })
    dispatch({ type: 'GET_ALL_TAGS' })
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }
    , [])

  const allStories = useSelector(story => story.stories.allStories)
  const currentStories = allStories.filter(story => DateTime.fromISO(story.publication_date) > DateTime.now())

  //! temporary fix. const allStories = useSelector(store => store.stories.allStories);

  // createMode: will the big story modal be in create or edit mode?
  const [createMode, setCreateMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickPlus = () => {
    setCreateMode(true);
    setModalOpen(true);
  }

  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  //* ============ SORT/FILTER/SEARCH STUFF ===============

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
      const tagsNameString = story.tags?.map(tag=>tag?.name?.toLowerCase()).join('');
      const tagsDescString = story.tags?.map(tag=>tag?.description?.toLowerCase()).join('')
      return tagsNameString+tagsDescString
    }

    function getThemesString(story) {
      const themesNameString = story.theme?.map(theme=>theme?.title?.toLowerCase()).join('');
      const themesDescString = story.theme?.map(theme=>theme?.description?.toLowerCase()).join('');
      return themesNameString+themesDescString
    }

    switch (searchBy) {
      case 'contact':
        return arr.filter(story => getContactsString(story).includes(searchTerm.toLowerCase()))
      case 'story info':
        return arr.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'theme':
        return arr.filter(story => getThemesString(story).includes(searchTerm.toLowerCase()))
      case 'tag':
        return arr.filter(story=>getTagsString(story).includes(searchTerm.toLowerCase()))
      case 'all':
        return arr.filter(story=>getTagsString(story).includes(searchTerm.toLowerCase()) || story.theme[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) || story.theme[0]?.description.toLowerCase().includes(searchTerm.toLowerCase()) || story.title.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes.toLowerCase().includes(searchTerm.toLowerCase()) || getContactsString(story).includes(searchTerm.toLowerCase()))
      default:
        return arr
    }
  }

  //! set to all stories for now. set to current stories to fix
  const storyResults = ascDesc(sortResults(searchResults(allStories)))

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h3'>Stories Page</Typography>
        <IconButton onClick={handleClickPlus}>
          <ControlPointIcon />
        </IconButton>
      </Box>
      <Box
        sx={{ ...mainContentBox, height: 700, overflow: 'hidden', overflowY: 'scroll' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        <Box>
          {storyResults.length ? storyResults.map(story => {
            return (
              <StoryListItem
                key={story.title}
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
        <Box sx={largeModal}>
          <StoryCreateEditModal setModalOpen={setModalOpen} createMode={createMode} setCreateMode={setCreateMode} />
        </Box>
      </Modal>

    </Box>
  )
}
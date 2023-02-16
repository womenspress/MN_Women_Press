import React, { useEffect, useState } from 'react';

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon'

// components
import StoryListItem from '../../components/StoryListItem/StoryListItem'
import StoryCreateEditModal from '../../components/StoryCreateEditModal/StoryCreateEditModal';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, IconButton, Typography, Modal } from '@mui/material';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'

// internal
import { largeModal, mainContentBox } from '../../__style'

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
  // added other date fields into current stories, as well as use photo_uploaded as a check to make sure story ideas do not drop off the story page (otherwise if there are no tasks assigned and with a default publication_date of today() it will not show on the page)
  const currentStories = allStories.filter(story => story.statusColor.color !== 'grey'
  )

  // createMode: will the big story modal be in create or edit mode?
  const [createMode, setCreateMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // passed into modal; used to determine dimensions
  const [step, setStep] = useState('general')
  const modalDimensions = step === 'general' ? { height: 600, width: 700 } : { height: 600, width: 900 }

  const handleClickPlus = () => {
    setCreateMode(true);
    setModalOpen(true);
  }

  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  //* ============ SORT/FILTER/SEARCH STUFF ===============

  const sortOptions = ['date added', 'title', 'status']
  const [sortMethod, setSortMethod] = useState('status');
  const [sortDirection, setSortDirection] = useState('ascending')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('default');
  const searchByOptions = ['default', 'all', 'story info', 'theme', 'tag', 'contact']


  const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()


  const sortResults = (arr) => {
    switch (sortMethod) {
      case 'date added':
        return arr.sort((a, b) => {
          if (DateTime.fromISO(a.date_added) > DateTime.fromISO(b.date_added)) return -1
          if (DateTime.fromISO(a.date_added) < DateTime.fromISO(b.date_added)) return +1
          else return 0
        })
      case 'title':
        return arr.sort((a, b) => {
          if (a.title > b.title) return 1
          if (a.title < b.title) return -1
          else return 0
        })
      case 'status':
        const statusArr = ['grey.100', '#b30000', '#fff633', '#008000', 'grey']
        return arr.sort((a, b) => {
          if (statusArr.indexOf(a.statusColor.color) > statusArr.indexOf(b.statusColor.color)) return -1
          if (statusArr.indexOf(a.statusColor.color) < statusArr.indexOf(b.statusColor.color)) return 1
          return 0
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
      const themesNameString = story.theme?.map(theme => theme?.name?.toLowerCase()).join('');
      const themesDescString = story.theme?.map(theme => theme?.description?.toLowerCase()).join('');
      console.log(themesNameString + themesDescString)
      return themesNameString + themesDescString
    }

    switch (searchBy) {
      case 'contact':
        return allStories.filter(story => getContactsString(story).includes(searchTerm.toLowerCase()))
      case 'story info':
        return allStories.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'theme':
        return allStories.filter(story => getThemesString(story).includes(searchTerm.toLowerCase()))
      case 'tag':
        return allStories.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()))
      case 'all':
        return allStories.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()) || story.theme[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) || story.theme[0]?.description.toLowerCase().includes(searchTerm.toLowerCase()) || story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || getContactsString(story).includes(searchTerm.toLowerCase()))
      case 'default':
        return arr.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()) || story.theme[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) || story.theme[0]?.description.toLowerCase().includes(searchTerm.toLowerCase()) || story.title?.toLowerCase().includes(searchTerm.toLowerCase()) || story.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || getContactsString(story).includes(searchTerm.toLowerCase()))
        break;
      default:
        return arr
    }
  }

  //! set to all stories for now. set to current stories to fix
  const storyResults = ascDesc(sortResults(searchResults(currentStories)))

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginX: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h3'>Stories</Typography>
          <IconButton onClick={handleClickPlus} color='primary'>
            <ControlPointIcon />
          </IconButton>
        </Box>
        <Box>
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
      <Box
        sx={{ ...mainContentBox, height: 700, overflow: 'hidden', overflowY: 'scroll' }}>
        <Box>
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
  )
}
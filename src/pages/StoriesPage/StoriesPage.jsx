import React, { useEffect, useState } from 'react';

// libraries
import { useDispatch, useSelector } from 'react-redux';
import {DateTime} from 'luxon'

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
    dispatch({ type: 'CLEAR_TEMP_STORY'})
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

  const sortOptions = ['date', 'title'];
  const filterOptions = ['all', 'recent'];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [sortDirection, setSortDirection] = useState('ascending');
  const [filterMethod, setFilterMethod] = useState('all')


  const filterResults = (arr) => {
    switch (filterMethod) {
      case 'all':
        return arr;
        break;
      // recent sets to the past three months
      case 'recent':
        return arr.filter(story => story.publication_date > DateTime.now().minus({ months: 3 }))
        break;
      default:
        return arr
    }
  }

  const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()

  const sortResults = (arr) => {

    switch (sortMethod) {
      case 'date':
        return arr.sort((a, b) => {
          if (DateTime.fromISO(a.publication_date) > DateTime.fromISO(b.publication_date)) return 1
          if (DateTime.fromISO(a.publication_date) < DateTime.fromISO(b.publication_date)) return -1
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

  const searchResults = (arr) => {
    function getContactsString(story) {
      return story.contacts.map(contact => contact?.name.toLowerCase()).join('')
    }

    function getTabsString(story) {
      return story.tags.map(tag => tag?.name.toLowerCase()).join('')
    }

    return arr.filter(story => story.title.toLowerCase().includes(searchTerm) || getContactsString(story).includes(searchTerm) || getTabsString(story).includes(searchTerm) || story.theme[0]?.name.toLowerCase().includes(searchTerm))
  }

  const storyResults = ascDesc(filterResults(sortResults(searchResults(currentStories))))


  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h3'>Stories Page</Typography>
        <IconButton onClick={handleClickPlus}>
          <ControlPointIcon />
        </IconButton>
      </Box>
      <Box
        sx={{ ...mainContentBox }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SortFilterSearch
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            sortMethod={sortMethod}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            setSortMethod={setSortMethod}
            filterMethod={filterMethod}
            setFilterMethod={setFilterMethod}
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
          <StoryCreateEditModal setModalOpen={setModalOpen} createMode={createMode} setCreateMode={setCreateMode}/>
        </Box>
      </Modal>

    </Box>
  )
}
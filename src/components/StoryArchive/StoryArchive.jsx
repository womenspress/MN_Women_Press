import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

// components
import { Box, Modal } from '@mui/material';
import StoryListItem from '../StoryListItem/StoryListItem';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'
import StoryCreateEditModal from '../StoryCreateEditModal/StoryCreateEditModal';

// internal
import { largeModal} from '../../__style'


export default function StoryArchive() {
  const dispatch = useDispatch();

  const allStories = useSelector(store => store.stories.allStories)

  const archiveStories = allStories.length ? allStories.filter(story => story.statusColor.color === 'grey') : [];



  const [step, setStep] = useState('general')
  const modalDimensions = step === 'general' ? { height: 600, width: 700 } : { height: 600, width: 900 }

  const [modalOpen, setModalOpen] = useState(false);
  const [createMode,setCreateMode] = useState(false)

  const handleClose = () => {
    setModalOpen(false)
    dispatch({ type: 'CLEAR_TEMP_STORY' })
  }

  //* ================= SORT/FILTER/SEARCH STUFF ===============

  // initialize all variables

  /* 
    const [options, setOptions]= useState({search: '', sort: 'date', direction: 'ascending', filter: 'all'}) 
    */

  const sortOptions = ['date published', 'title',]
  const [sortMethod, setSortMethod] = useState('date published');
  const [sortDirection, setSortDirection] = useState('ascending')

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const searchByOptions = ['all', 'title', 'contact', 'tag', 'theme']

  const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()

  const sortResults = (arr) => {

    switch (sortMethod) {
      case 'date published':
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

    function getTagsString(story) {
      return story.tags.map(tag => tag?.name.toLowerCase()).join('')
    }

    switch (searchBy) {
      case 'all':
        return arr.filter(story => story.title.toLowerCase().includes(searchTerm) || getContactsString(story).includes(searchTerm) || getTagsString(story).includes(searchTerm) || story.theme[0]?.name.toLowerCase().includes(searchTerm))
      case 'title':
        return arr.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()))
      case 'contact':
        return arr.filter(story => getContactsString(story).includes(searchTerm.toLowerCase()))
      case 'tag':
        return arr.filter(story => getTagsString(story).includes(searchTerm.toLowerCase()))
      case 'theme':
        return arr.filter(story => story.theme[0].name.toLowerCase().includes(searchTerm.toLowerCase()))
      default:
        return arr
    }
  }

  const storyResults = ascDesc(sortResults(searchResults(archiveStories)))

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
      {storyResults.map(story => {
        return (
          <StoryListItem 
          key={story.id} 
          story={story} 
          createMode = {createMode}
          setCreateMode={setCreateMode}
          setModalOpen={setModalOpen}
          />
        )
      })}
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

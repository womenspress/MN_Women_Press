import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

// components
import { Box, Typography, TextField } from '@mui/material';
import StoryListItem from '../StoryListItem/StoryListItem';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'

export default function StoryArchive() {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [sortDirection, setSortDirection] = useState('ascending')
  const [filterMethod, setFilterMethod] = useState('none');
  const sortOptions = ['date', 'title']
  const filterOptions = ['none', 'recent',]

  const allStories = useSelector(store => store.stories.allStories)
  console.log('all stories: ', allStories)

  const archiveStories = allStories.length ? allStories.filter(story => story.publication_date < DateTime.now().toISO()) : [];

  const filterResults = (arr) => {
    switch (filterMethod) {
      case 'none':
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

  //! all of these sort methods need to be double-checked
  const sortResults = (arr) => {
    let outputArray

    if (sortDirection === 'descending') outputArray = arr.reverse()

    switch (sortMethod) {
      case 'date':
        return outputArray?.sort((a, b) => {
          if (DateTime.fromISO(a.publication_date) > DateTime.fromISO(b.publication_date)) return -1
          if (DateTime.fromISO(a.publication_date) < DateTime.fromISO(b.publication_date)) return 1
          else return 0
        })
        break;
      case 'title':
        return outputArray.sort((a, b) => {
          if (a.title > b.title) return -1
          if (a.title < b.title) return 1
          else return 0
        })
        break;
      default:
        return outputArray;
    }
  }

  const searchResults = (arr) => {
    // const arrTags = arr.map(story=>story.tags).map(tag=>tag.name)
    // const arrContacts = arr.map(story=>story.contacts).map(contact=>contact.name)
    // const arrTitles = arr.map(story=>story.title)
    // const arrThemes = arr.map(story=>story.theme.name)

    function getContactsString(story) {
      return story.contacts.map(contact => contact.name.toLowerCase()).join('')
    }

    function getTabsString(story) {
      return story.tags.map(tag => tag.name.toLowerCase()).join('')
    }

    return arr.filter(story => story.title.toLowerCase().includes(searchTerm) || getContactsString(story).includes(searchTerm) || getTabsString(story).includes(searchTerm) || story.theme[0].name.toLowerCase().includes(searchTerm))
  }

  const storyResults = filterResults(sortResults(searchResults(archiveStories)))

  return (
    <Box>
      {/* sort, search, and filter methods */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h4'>Stories </Typography>
        <SortFilterSearch
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Box>
      {allStories.map(story => {
        return (
          <StoryListItem key = {story.id} story={story} />
        )
      })}
    </Box>
  )
}

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
  const [filterMethod, setFilterMethod] = useState('title');
  const sortOptions = ['date', 'title']
  const filterOptions = ['date', 'title']

  const allStories = useSelector(store => store.stories.allStories)
  console.log('all stories: ', allStories)

  const archiveStories = allStories.length ? allStories.filter(story => story.publication_date < DateTime.now().toISO()) : [];

  return (
    <Box>
      {/* sort, search, and filter methods */}
      <Box>

        <SortFilterSearch
          sortOptions = {sortOptions}
          filterOptions= {filterOptions}
          sortMethod = {sortMethod}
          setSortMethod = {setSortMethod}
          filterMethod = {filterMethod}
          setFilterMethod = {setFilterMethod}
          searchTerm = {searchTerm}
          setSearchTerm = {setSearchTerm}
        />
      </Box>
      <Typography variant='body1'>stories archive</Typography>
      {archiveStories.length && archiveStories?.map(story => {
        return (
          <StoryListItem story={story} />
        )
      })}
    </Box>
  )
}

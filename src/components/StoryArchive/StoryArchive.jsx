import React from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

// components
import { Box, Typography } from '@mui/material';
import StoryListItem from '../StoryListItem/StoryListItem'

export default function StoryArchive() {

  const allStories = useSelector(store => store.stories.allStories)

  const archiveStories = allStories.filter(story => story.publication_date < DateTime.now().toISO());

  return (
    <Box>
      {archiveStories.map(story => {
        return (
          <StoryListItem story={story} />
        )
      })}
    </Box>
  )
}

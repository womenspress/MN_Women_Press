import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StoryListItem from '../../components/StoryListItem/StoryListItem'

export default function StoriesPage() {
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = useState(true)
  const stories = useSelector(store => store.stories.allStories);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_STORIES' })
  }, [])

  return (
    <>
      <h1>Stories Page</h1>
      {stories.map((item) => {
        return (
          <StoryListItem
            key={item.id}
            story={item}
            createMode={createMode}
            setCreateMode={setCreateMode}
          />
        )
      })}
    </>
  )
}
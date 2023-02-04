import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StoryListItem from '../../components/StoryListItem/StoryListItem'
import { story } from '../../sampleData';

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
      {stories.map((item) => {return <StoryListItem key={item.id} story={item} createMode={createMode} setCreateMode={setCreateMode} />})}
      {/* <StoryListItem story={story} createMode={createMode} setCreateMode={setCreateMode} /> */}
    </>
  )
}
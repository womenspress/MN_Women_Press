import React from 'react';

import StoryListItem from '../../components/StoryListItem/StoryListItem'
import { story } from '../../sampleData';

export default function StoriesPage() {

  const [createMode, setCreateMode] = useState(true)

  return (
    <>
      <h1>Stories Page</h1>
      <StoryListItem story={story} createMode={createMode} setCreateMode={setCreateMode} />
    </>
  )
}
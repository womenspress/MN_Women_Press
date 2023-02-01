import React from 'react'

export default function CreateStory({createMode}) {
  return (
    <div>{createMode? 'Create Story': 'Edit Story'}</div>
  )
}

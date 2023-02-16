import React from 'react';
// components
import { Avatar } from '@mui/material'

export default function ContactAvatar(props) {

  const {
    contact,
    avatarStyle
  } = props

  const getInitials = (contact) => {
    const nameArr = contact.name.split(' ');
    if (nameArr.length > 1) return (nameArr[0][0] + nameArr[nameArr.length-1][0]).toUpperCase()
    else return nameArr[0][0].toUpperCase()
  }

  const stringToValue = (string) => {
    let sumValue = 0
    for (let i = 0; i < 4; i++) {
      sumValue += string.charCodeAt(string.length - i) || 0
    }
    return sumValue
  }

  const makeRandomColor = (username) => {
    const index = Math.floor((stringToValue(username) / 500) * 16777215).toString(16);
    return '#' + index
  }

  return (
    <>
      {contact.photo ?
        <Avatar alt={`${contact.name}'s avatar`} src={contact.photo} sx = {{...avatarStyle}}/>
        :
        <Avatar sx = {{...avatarStyle, bgcolor: makeRandomColor(contact.name) }}>{getInitials(contact)}</Avatar>
      }
    </>
  )
}

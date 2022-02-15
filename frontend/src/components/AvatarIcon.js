import React from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'

const AvatarIcon = () => {
  const { firstname, lastname } = useSelector((store) => store.user)

  const stringToColor = (string) => {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 100,
        height: 100,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  return (
    <>
      <Avatar {...stringAvatar(`${firstname} ${lastname}`)} />
    </>
  )
}

export default AvatarIcon

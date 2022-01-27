import react from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'

import user from '../reducers/user'

const AvatarIcon = () => {
  const username = useSelector((store) => store.user.username)
  console.log('avatarusername', username)

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
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  return (
    <>
      <Avatar {...stringAvatar(`${username} ${username}`)} />
    </>
  )
}

export default AvatarIcon

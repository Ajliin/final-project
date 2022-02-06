import react from 'react'
import { Typography, Box, Link } from '@material-ui/core'

import { styles } from '../utils/theme'

const Category = ({ category, no }) => {
  console.log('categoryName', category)
  // console.log('no', no)
  return (
    <Link href="#" underline="none">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          className="img-profile"
          src={`https://source.unsplash.com/random/100x100?sig=${no}`}
        />
        <Typography>{category}</Typography>
      </Box>
    </Link>
  )
}

export default Category

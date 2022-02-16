import { Typography, Box, Link } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import companies from '../reducers/companies'
import { URL_API } from '../utils/url'

const Category = ({ category, no, searchSkills }) => {
  const dispatch = useDispatch()

  const getCategory = (searchSkills) => {
    fetch(URL_API(`category-companies?skills=${searchSkills}`))
      .then((res) => res.json())
      .then((data) => {
        dispatch(companies.actions.setCompanies(data.response))
        dispatch(companies.actions.setCategory(true))
      })
  }

  return (
    <Link onClick={() => getCategory(searchSkills)} href="#" underline="none">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}
      >
        <img
          className="img-profile"
          src={`https://source.unsplash.com/random/100x100?sig=${no}`}
          alt="company "
        />
        <Typography>{category}</Typography>
      </Box>
    </Link>
  )
}

export default Category

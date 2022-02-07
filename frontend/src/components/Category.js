import react from 'react'
import { Typography, Box, Link } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import companies from '../reducers/companies'
import { TEST_API } from '../utils/url'

import { styles } from '../utils/theme'

const Category = ({ category, no, searchSkills }) => {
  console.log('categoryName', category)
  //console.log('searchSkills', searchSkills)

  const dispatch = useDispatch()

  const getCategory = (searchSkills) => {
    console.log('searchSkills', searchSkills)
    console.log(
      'searchSkills URL',
      `result-companies?companyName=&&location=&&skills=${searchSkills}`,
    )

    fetch(
      TEST_API(
        `result-companies?companyName=""&&location=""&&skills=${searchSkills}`,
      ),
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('category search', data)
        //setUser(data.response[0].companyName)
        //dispatch(companies.actions.setCompanies(data.response))
      })
  }

  // console.log('no', no)
  return (
    <Link onClick={() => getCategory(searchSkills)} href="#" underline="none">
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

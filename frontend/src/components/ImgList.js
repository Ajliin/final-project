import { Card, Grid, Box } from '@material-ui/core'

const ImgList = () => {
  return (
    <Grid container spacing={2}>
      {data.map((img, index) => (
        <Grid key={index} item xs={6} sm={4} md={2}>
          <Card sx={{ maxWidth: 100 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // maxWidth: 200,
              }}
            >
              <img
                className="company-profile"
                src={`https://source.unsplash.com/random/170x170?sig=${index}`}
                alt="from company webpage"
              />
              <p>{img.title}</p>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ImgList

const data = [
  {
    img: '',
    title: 'Lorum Ipsum',
    author: '',
  },
  {
    img: '',
    title: 'dolor sit amet',
    author: '',
  },
  {
    img: '',
    title: 'dolor sit amet',
    author: '',
  },
  {
    img: '',
    title: 'elit, sed do eiusmod',
    author: '',
  },
  {
    img: '',
    title: 'Lorum Ipsum',
    author: '',
  },
  {
    img: '',
    title: 'dolor sit amet',
    author: '',
  },
  {
    img: '',
    title: 'dolor sit amet',
    author: '',
  },
  {
    img: '',
    title: 'elit, sed do eiusmod',
    author: '',
  },
  {
    img: '',
    title: 'Lorum Ipsum',
    author: '',
  },
  {
    img: '',
    title: 'dolor sit amet',
    author: '',
  },
  {
    img: '',
    title: 'dolor sit amet',
    author: '',
  },
  {
    img: '',
    title: 'elit, sed do eiusmod',
    author: '',
  },
]

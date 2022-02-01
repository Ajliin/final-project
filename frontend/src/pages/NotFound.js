import react from 'react'

import Menu from '../components/Menu'

const NotFound = () => {
  return (
    <>
      <Menu />
      <section className="app-container">
        <div position="static" color="secondary">
          <p>Not found.. </p>
        </div>
      </section>
    </>
  )
}

export default NotFound

import React from 'react'
import Grid from '@material-ui/core/Grid'
import TopNav from '../components/TopNav/TopNav'

const defaultLayout = ({ children }) => {
  return (
    <Grid item xs={12}>
      <TopNav />
      {children}
    </Grid>
  )
}

export default defaultLayout

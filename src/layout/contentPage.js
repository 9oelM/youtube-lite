import Grid from '@material-ui/core/Grid'
import { TopNavContainer } from '../components/Containers/index.js'
import React from 'react'

const ContentPage = ({ children }) => {
  return (
    <Grid id="ContentPage" style={{ padding: 16 }}>
      <TopNavContainer />
      {children}
    </Grid>
  )
}

export default ContentPage

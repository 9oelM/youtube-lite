import Grid from '@material-ui/core/Grid'
import { TopNavContainer } from '../components/Containers/index.js'
import React from 'react'

const ContentPage = ({ children }) => {
  return (
    <React.Fragment>
      <TopNavContainer />
      <Grid id="ContentPage" style={{ padding: 16 }}>
        {children}
      </Grid>
    </React.Fragment>
  )
}

export default ContentPage

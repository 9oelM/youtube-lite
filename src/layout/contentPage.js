import Grid from '@material-ui/core/Grid'
import React from 'react'
const ContentPage = ({ children }) => {
  return (
    <Grid id="ContentPage" style={{ padding: 16 }}>
      {children}
    </Grid>
  )
}

export default ContentPage

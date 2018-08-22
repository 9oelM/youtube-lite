import Grid from '@material-ui/core/Grid'
import { TopNavContainer } from '../components/Containers/index.js'
import React from 'react'
import { setContentPagePaddingEqual } from '../modules/resize'

class ContentPage extends React.Component {
  componentDidMount() {
    setContentPagePaddingEqual()
  }

  componentDidUpdate() {
    setContentPagePaddingEqual()
  }

  render() {
    const { children } = this.props

    return (
      <React.Fragment>
        <TopNavContainer />
        <Grid id="ContentPage">{children}</Grid>
      </React.Fragment>
    )
  }
}

export default ContentPage

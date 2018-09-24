import Grid from "@material-ui/core/Grid"
import React from "react"
import PropTypes from "prop-types"
import { TopNavContainer } from "../components/Containers/index"
import BottomNav from "../components/BottomNav/BottomNav"
import setContentPagePaddingEqual from "../modules/resize"

class ContentGrid extends React.Component {
  componentDidMount() {
    setContentPagePaddingEqual()
  }

  componentDidUpdate() {
    setContentPagePaddingEqual()
  }

  render() {
    const { children, _className } = this.props

    return (
      <React.Fragment>
        <TopNavContainer />
        <Grid id="ContentPage" className={_className}>
          {children}
        </Grid>
        <BottomNav />
      </React.Fragment>
    )
  }
}

ContentGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ContentGrid

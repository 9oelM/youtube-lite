import React from "react"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types"
import {
  TopNavContainer,
  BottomNavContainer,
} from "../components/Containers/index"
import Progress from "../components/Progress/Progress"
import setContentPagePaddingEqual from "../modules/resize"

class ContentGrid extends React.Component {
  componentDidMount() {
    setContentPagePaddingEqual()
  }

  componentDidUpdate() {
    setContentPagePaddingEqual()
  }

  render() {
    const { children, _className, isFetching } = this.props

    return (
      <React.Fragment>
        <Progress isLoading={isFetching} />
        <TopNavContainer />
        <Grid id="ContentPage" className={_className}>
          {children}
        </Grid>
        <BottomNavContainer />
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

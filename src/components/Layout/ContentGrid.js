import React from "react"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types"
import { TopNavContainer, BottomNavContainer } from "../Containers/index"
import Progress from "../Progress/Progress"
import setContentPagePaddingEqual from "../../modules/resize"

class ContentGrid extends React.Component {
  componentDidMount() {
    setContentPagePaddingEqual()
  }

  componentDidUpdate() {
    setContentPagePaddingEqual()
  }

  render() {
    const { children, _className, isFetching } = this.props
    const loading = isFetching
    return (
      <React.Fragment>
        <Progress isLoading={loading} />
        <TopNavContainer />
        <Grid id="ContentPage" className={_className}>
          {loading ? null : children}
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
  isFetching: PropTypes.bool.isRequired,
  _className: PropTypes.string.isRequired,
}

export default ContentGrid

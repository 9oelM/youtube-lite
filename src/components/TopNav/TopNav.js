import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import YoutubeAutocomplete from 'new-material-react-youtube-autocomplete'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
  },
}
class TopNav extends React.Component {
  render() {
    const { classes, onSearchResults, onSearchError } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <YoutubeAutocomplete
              option={{
                key: 'AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28',
                type: ['video', 'playist'],
                maxResults: 15,
              }}
              placeholderText="Search youtube"
              onSearchResults={results => console.log(results)}
              onSearchError={error => console.log(error)}
            />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopNav)

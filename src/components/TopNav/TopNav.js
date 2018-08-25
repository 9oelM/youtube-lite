import React from "react"
import PropTypes from "prop-types"
import RouterPT from "react-router-prop-types"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import YoutubeAutocomplete from "new-material-react-youtube-autocomplete"
import Drawer from "../Drawer/Drawer"

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
const TopNav = ({
  classes,
  onToggle,
  isDrawerOpen,
  onSearchTrigger,
  onSearchResults,
  history,
}) => (
  <div className={classes.root} id="TopNav">
    <Drawer isDrawerOpen={isDrawerOpen} onToggle={onToggle} />
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onToggle}
        >
          <MenuIcon />
        </IconButton>
        <YoutubeAutocomplete
          option={{
            key: "AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28",
            type: ["video", "playist"],
            maxResults: 15,
          }}
          placeholderText="Search youtube"
          onSearchResults={results => onSearchResults(results)}
          onSearchTrigger={searchWord => {
            onSearchTrigger(searchWord)
            history.push(`/searchResultView/${searchWord}`)
          }}
        />
      </Toolbar>
    </AppBar>
  </div>
)

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSearchResults: PropTypes.func.isRequired,
  onSearchTrigger: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  history: RouterPT.history.isRequired,
}

export default withStyles(styles)(withRouter(TopNav))

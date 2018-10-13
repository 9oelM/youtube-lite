import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Switch from "@material-ui/core/Switch"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ContentGrid from "../layout/ContentGrid"
import { PlaylistsPanelContainer } from "../components/Containers/index"

const Playlists = ({ playlists }) => (
  <ContentGrid _className="padBottom">
    <Paper id="settings-container">
      <PlaylistsPanelContainer />
    </Paper>
  </ContentGrid>
)

export default Playlists

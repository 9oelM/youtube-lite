import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ContentGrid from "../layout/ContentGrid"
import { SettingsListsContainer } from "../components/Containers"

const Settings = () => (
  <ContentGrid _className="padBottom">
    <Paper id="settings-container">
      <Typography variant="headline">Settings</Typography>
      <SettingsListsContainer />
    </Paper>
  </ContentGrid>
)

export default Settings

import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ContentGrid from "../layout/ContentGrid"
import { SettingsListsContainer } from "../components/Containers"

const Settings = () => (
  <ContentGrid _className="home">
    <Typography variant="h5" align="center">
        Something's wrong!
    </Typography>
    <Typography variant="h5" align="center">
        Please check your URL again.
    </Typography>
  </ContentGrid>
)

export default Settings

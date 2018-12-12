import React from "react"
import Paper from "@material-ui/core/Paper"
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

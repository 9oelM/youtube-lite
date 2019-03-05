import React from "react"
import Typography from "@material-ui/core/Typography"
import ContentGrid from "../layout/ContentGrid"

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

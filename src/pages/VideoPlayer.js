import React from "react"
import ReactRouterPropTypes from "react-router-prop-types"
import { withRouter } from "react-router-dom"
import VideoPlayerPanel from "../components/VideoPlayer/VideoPlayerPanel"
import ContentGrid from "../layout/ContentGrid"

const VideoPlayer = ({ match }) => (
  <ContentGrid _className="padBottom">
    <VideoPlayerPanel vId={match.params.id} />
  </ContentGrid>
)

VideoPlayer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default withRouter(VideoPlayer)

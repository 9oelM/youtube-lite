// react & material
import React from "react"
import { Route } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"

// layout
import OuterLayout from "./layout/default"

// pages
import Home from "./pages/Home"
import SearchResultView from "./pages/SearchResultView"
import VideoPlayerView from "./pages/VideoPlayerView"
import SettingsView from "./pages/SettingsView"

// styles
import "typeface-roboto"
import "./styles/output/master.css"

const App = () => (
  <OuterLayout>
    <CssBaseline />
    <Route exact path="/" component={Home} />
    <Route path="/searchResultView/:searchWord" component={SearchResultView} />
    <Route path="/videoPlayerView/:id" component={VideoPlayerView} />
    <Route path="/settings" component={SettingsView} />
  </OuterLayout>
)

export default App

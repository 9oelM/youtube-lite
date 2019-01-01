// react & material
import React from "react"
import { Route } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"

// layout
import OuterLayout from "./layout/default"

// pages
import Home from "./pages/Home/Home"
import SearchResult from "./pages/SearchResult"
import VideoPlayer from "./pages/VideoPlayer"
import Settings from "./pages/Settings"
import About from "./pages/About"
import Playlists from "./pages/Playlists"

// styles
import "typeface-roboto"
import "./styles/output/master.css"

const App = () => (
  <OuterLayout>
    <CssBaseline />
    <Route exact path="/" component={Home} />
    <Route path="/SearchResultView/:searchWord" component={SearchResult} />
    <Route path="/VideoPlayerView/:playlist/:id" component={VideoPlayer} />
    <Route path="/Settings" component={Settings} />
    <Route path="/About" component={About} />
    <Route path="/Playlists" component={Playlists} />
  </OuterLayout>
)

export default App

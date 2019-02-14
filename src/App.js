// react & material
import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
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
import NotFound from "./pages/NotFound"

// styles
import "typeface-roboto"
import "./styles/output/master.css"

const App = () => (
  <OuterLayout>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search-result/:searchWord" component={SearchResult} />
      <Redirect from="/video/:id" to="/video-player/Default/:id" />
      <Route path="/video-player/:playlist/:id" component={VideoPlayer} />
      <Route path="/settings" component={Settings} />
      <Route path="/about" component={About} />
      <Route path="/playlists" component={Playlists} />
      <Route component={NotFound} />
    </Switch>
  </OuterLayout>
)

export default App

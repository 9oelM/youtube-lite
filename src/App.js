// components

import React, { Component } from "react";
import "typeface-roboto";

// pages

import Home from "./pages/Home";
import SearchResultView from "./pages/SearchResultView";
import VideoPlayerView from "./pages/VideoPlayerView";

// misc
import { Route, Link } from "react-router-dom";
import "./styles/output/master.css";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Route exact path="/" component={Home} />
        <Route exact path="/searchResultView" component={SearchResultView} />
        <Route exact path="/videoPlayerView" component={VideoPlayerView} />
      </div>
    );
  }
}

export default App;

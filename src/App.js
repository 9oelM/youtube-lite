// layout
import Layout from './layout/default'

// pages

import Home from './pages/Home'
import SearchResultView from './pages/SearchResultView'
import VideoPlayerView from './pages/VideoPlayerView'

// react
import React, { Component, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

// styles
import 'typeface-roboto'
import './styles/output/master.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import './modules/resize'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <CssBaseline />
          <Route exact path="/" component={Home} />
          <Route exact path="/searchResultView" component={SearchResultView} />
          <Route exact path="/videoPlayerView" component={VideoPlayerView} />
        </Layout>
      </Fragment>
    )
  }
}

export default App

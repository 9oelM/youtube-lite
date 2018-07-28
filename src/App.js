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

// misc
import TransitionGroup from 'react-transition-group/TransitionGroup'

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout>
          <CssBaseline />
          <Route
            exact
            path="/"
            children={({ match, ...rest }) => (
              <TransitionGroup component={firstChild}>
                {match && <Home {...rest} />}
              </TransitionGroup>
            )}
          />
          <Route
            exact
            path="/searchResultView"
            children={({ match, ...rest }) => (
              <TransitionGroup component={firstChild}>
                {match && <SearchResultView {...rest} />}
              </TransitionGroup>
            )}
          />
          <Route
            exact
            path="/videoPlayerView"
            children={({ match, ...rest }) => (
              <TransitionGroup component={firstChild}>
                {match && <VideoPlayerView {...rest} />}
              </TransitionGroup>
            )}
          />
        </Layout>
      </Fragment>
    )
  }
}

export default App

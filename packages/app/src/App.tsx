import React, { Suspense } from "react"
import { FC } from "react"
import { Provider } from "react-redux"
import { Switch, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import { ConnectedRouter } from "connected-react-router"
import { youtubeLiteTheme } from "src/styles/theme"
import { NotFoundPageImpure } from "src/components/Pages/NotFound"
import { Preflight } from "@xstyled/styled-components"
import { GlobalStyle } from "src/styles/globalStyle"
import configureStore, { history } from "src/redux/store"

const LazyMainPageImpure = React.lazy(() =>
  import(`src/components/Pages/Main`).then((module) => ({
    default: module.MainPageImpure,
  }))
)
const LazySearchResultPageImpure = React.lazy(() =>
  import(`src/components/Pages/SearchResult`).then((module) => ({
    default: module.SearchResultPageImpure,
  }))
)
const LazyWatchPageImpure = React.lazy(() =>
  import(`src/components/Pages/Watch`).then((module) => ({
    default: module.WatchPageImpure,
  }))
)

const store = configureStore()

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Preflight />
        <ThemeProvider theme={youtubeLiteTheme}>
          <Suspense fallback={<></>}>
            <Switch>
              <Route path="/" exact>
                <LazyMainPageImpure />
              </Route>
              {/* https://www.youtube.com/results?search_query=my+search+query */}
              <Route path="/results">
                <LazySearchResultPageImpure />
              </Route>
              <Route path="/watch">
                <LazyWatchPageImpure />
              </Route>
              <Route>
                <NotFoundPageImpure />
              </Route>
            </Switch>
          </Suspense>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

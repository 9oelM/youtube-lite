import React from "react"
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
import { MainPageImpure } from "src/components/Pages/Main"
import { SearchResultPageImpure } from "src/components/Pages/SearchResult"
import { WatchPageImpure } from "src/components/Pages/Watch"

const store = configureStore()

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Preflight />
        <ThemeProvider theme={youtubeLiteTheme}>
          <Switch>
            <Route path="/" exact>
              <MainPageImpure />
            </Route>
            {/* https://www.youtube.com/results?search_query=my+search+query */}
            <Route path="/results">
              <SearchResultPageImpure />
            </Route>
            <Route path="/watch">
              <WatchPageImpure />
            </Route>
            <Route>
              <NotFoundPageImpure />
            </Route>
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

import React from "react"
import { FC } from "react"
import { Provider } from "react-redux"
import { ExampleImpure } from "src/components/Example"
import { store } from "src/store"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { youtubeLiteTheme } from "src/styles/theme"
import { NotFoundPagePure } from "src/components/Pages/NotFound"
import { Preflight } from "@xstyled/styled-components"
import { GlobalStyle } from "src/styles/globalStyle"

export const App: FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Preflight />
      <ThemeProvider theme={youtubeLiteTheme}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <ExampleImpure color="#345345" />
            </Route>
            <Route>
              <NotFoundPagePure />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

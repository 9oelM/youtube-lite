import React from "react"
import { FC } from "react"
import { Provider } from "react-redux"
import { ExampleImpure } from "src/components/Example"
import { store } from "src/store"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { theme } from "src/styles/theme"

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <ExampleImpure color="#345345" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

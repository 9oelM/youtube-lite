import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { createMuiTheme } from "@material-ui/core/styles"
import { PersistGate } from "redux-persist/integration/react"
import App from "./App"
import theme from "./theme"
import registerServiceWorker from "./registerServiceWorker"
import { store, persistor } from "./store/index"

/* global document */

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer>
          <HashRouter>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </HashRouter>
        </AppContainer>
      </PersistGate>
    </Provider>,
    document.getElementById("root")
  )

registerServiceWorker()
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    render(App)
  })
}

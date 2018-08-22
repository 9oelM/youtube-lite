import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store/index'

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <HashRouter>
          <App />
        </HashRouter>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
registerServiceWorker()
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

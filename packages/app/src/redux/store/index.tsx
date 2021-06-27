/* istanbul ignore file */
import { applyMiddleware, createStore, Store } from "redux"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router"
import { createRootReducer } from "src/redux/reducers"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "src/redux/sagas"

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(
  preloadedState?: Parameters<typeof createStore>[1]
): Store {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware
        // ... other middlewares ...
      )
    )
  )
  sagaMiddleware.run(rootSaga)

  return store
}

import { applyMiddleware, compose, createStore, Store } from "redux"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router"
import { createRootReducer } from "src/redux/reducers"

export const history = createBrowserHistory()

export default function configureStore(
  preloadedState?: Parameters<typeof createStore>[1]
): Store {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history) // for dispatching history actions
        // ... other middlewares ...
      )
    )
  )

  return store
}

import { createStore } from "redux"
import reducers from "../reducers/reducers"
import { persistStore } from "redux-persist"

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const persistor = persistStore(store)
export { store, persistor }

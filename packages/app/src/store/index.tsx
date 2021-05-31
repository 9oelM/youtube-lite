import { createStore } from "redux"
import { rootReducer } from "src/redux/reducers"

export const store = createStore(rootReducer)

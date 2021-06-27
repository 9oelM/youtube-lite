/* istanbul ignore file */
import { connectRouter } from "connected-react-router"
import { combineReducers } from "redux"
import { ephemeralReducer } from "src/redux/ducks/ephemeral"
import { asyncReducer } from "src/utilities/redux-async/asyncReducer"
import { StateType } from "typesafe-actions"
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createRootReducer(
  history: Parameters<typeof connectRouter>[0]
) {
  return combineReducers({
    router: connectRouter(history),
    async: asyncReducer,
    ephemeral: ephemeralReducer,
  })
}

export type RootState = StateType<ReturnType<typeof createRootReducer>>
export type RS = RootState

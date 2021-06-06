import { connectRouter, RouterState } from "connected-react-router"
import { AnyAction, CombinedState, combineReducers, Reducer } from "redux"

export function createRootReducer(
  history: Parameters<typeof connectRouter>[0]
): Reducer<
  CombinedState<{
    router: RouterState<unknown>
  }>,
  AnyAction
> {
  return combineReducers({
    router: connectRouter(history),
  })
}

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>
export type RS = RootState

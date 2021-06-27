import produce from "immer"
import { YTLAsyncJobs } from "src/redux/ducks/async/asyncActions"
import { YoutubeSearchItem } from "src/types/youtube"
import { getReduxAsyncType } from "src/utilities/redux-async/asyncTypes"
import { ActionType, createReducer } from "typesafe-actions"

export type EphemeralReducerState = {
  youtubeSearchResultItems: YoutubeSearchItem[]
}

export type EphemeralReducerActions = ActionType<
  typeof YTLAsyncJobs[`getSearchResult`]
>

/**
 * you can only DELETE or WRITE for this reducer.
 * this reducer is meant to store ephemeral information
 * that does not necessarily stay for the lifetime of the website.
 */
export const ephemeralReducer = createReducer<
  EphemeralReducerState,
  EphemeralReducerActions
>({
  youtubeSearchResultItems: [],
}).handleType(
  getReduxAsyncType(YTLAsyncJobs.getSearchResult.succeed),
  (state, action) => {
    return produce(state, (draftState) => {
      draftState.youtubeSearchResultItems = action.payload.searchResultItems
    })
  }
)

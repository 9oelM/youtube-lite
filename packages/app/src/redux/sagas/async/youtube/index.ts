import axios from "axios"
import { ENV } from "src/environment"
import { YTLAsyncJobs } from "src/redux/ducks/async/asyncActions"
import { YoutubeSearchListResponse } from "src/types/youtube"
import { tcAsync } from "src/utilities/essentials"
import { getReduxAsyncType } from "src/utilities/redux-async/asyncTypes"
import { call, put, takeLatest } from "typed-redux-saga"
import { ActionType } from "typesafe-actions"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* searchVideosFromYoutubeFromQueryString(
  action: ActionType<typeof YTLAsyncJobs[`getSearchResult`][`start`]>
) {
  const params = new URLSearchParams([
    [`q`, action.payload.searchQuery],
    [`part`, `snippet`],
    // ~50
    [`maxResults`, `50`],
    [`key`, ENV.YOUTUBE_API_KEY],
    [`type`, `video`],
    [`type`, `playist`],
  ])
  /**
   * exmaple
   */
  // https://www.googleapis.com/youtube/v3/search?q=%EB%AC%B4%ED%95%9C%EB%8F%84%EC%A0%84&part=snippet&maxResults=15&key=AIzaSyBS_mShhwnJf4T2C45rbsRLVIwT-vLJKHQ&type=video&type=playist
  const [ytSearchError, ytSearchResponse] = yield* call(() =>
    tcAsync(
      axios.get<YoutubeSearchListResponse>(ENV.YOUTUBE_SEARCH_URL, {
        params,
      })
    )
  )

  if (ytSearchError || !ytSearchResponse) {
    yield* put(
      YTLAsyncJobs.getSearchResult.fail({
        id: action.id,
      })
    )

    return
  }

  yield* put(
    YTLAsyncJobs.getSearchResult.succeed({
      id: action.id,
      payload: {
        searchResultItems: ytSearchResponse.data.items,
      },
    })
  )

  return
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watchGetSearchResultStart() {
  yield* takeLatest(
    getReduxAsyncType(YTLAsyncJobs.getSearchResult.start),
    searchVideosFromYoutubeFromQueryString
  )
}

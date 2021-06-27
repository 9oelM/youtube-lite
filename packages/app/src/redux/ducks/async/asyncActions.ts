/* istanbul ignore file */
import { YoutubeSearchItem } from "src/types/youtube"
import { createJobSet } from "src/utilities/redux-async/asyncActions"

export enum YTLiteAsyncJobs {
  GET_SEARCH_RESULT = `GET_SEARCH_RESULT`,
}

const getSearchResult = createJobSet<
  YTLiteAsyncJobs,
  undefined,
  {
    searchQuery: string
  },
  {
    searchResultItems: YoutubeSearchItem[]
  }
>(YTLiteAsyncJobs.GET_SEARCH_RESULT)

export const YTLAsyncJobs = {
  getSearchResult,
}

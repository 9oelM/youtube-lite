/* istanbul ignore file */
import { createJobSet } from "src/utilities/redux-async/asyncActions"
export enum YTLiteAsyncJobs {
  GET_SEARCH_RESULT = `GET_SEARCH_RESULT`,
}

const getSearchResult = createJobSet<
  YTLiteAsyncJobs,
  undefined,
  {
    searchQuery: string
  }
>(YTLiteAsyncJobs.GET_SEARCH_RESULT)

export const YTLAsyncJobs = {
  getSearchResult,
}

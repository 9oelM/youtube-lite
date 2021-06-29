import axios from "axios"
import { tcAsync } from "src/utilities/essentials"
// @ts-ignore
import axiosJsonpAdapter from "axios-jsonp"

export const YOUTUBE_API_KEY = (() => {
  if (!process.env[`DEPLOY_TARGET`]) {
    throw new Error(`process.env.DEPLOY_TARGET undefined`)
  }

  switch (process.env[`DEPLOY_TARGET`]) {
    case `DEV`:
      return `AIzaSyD2q5pHwhNyrjXRlzrJ7A8M17blcFt_UXI`
    case `PROD`:
      return `AIzaSyBS_mShhwnJf4T2C45rbsRLVIwT-vLJKHQ`
    default:
      throw new Error(`process.env.DEPLOY_TARGET undefined`)
  }
})()

export const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search`
export const YOUTUBE_SUGGESTION_URL = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q={}`

/**
 *
 * @param searchKeyword keyword to get suggestions for
 * @returns null on error and list of suggestions on success
 */
export async function requestYoutubeSearchSuggestions(
  searchKeyword: string
): Promise<string[] | null> {
  const youtubeSuggestionURLWithSearchKeyword = YOUTUBE_SUGGESTION_URL.replace(
    `{}`,
    searchKeyword
  )

  const [youtubeSuggestionError, youtubeSuggestionResult] = await tcAsync(
    axios.get<
      [
        originalKeyword: string,
        suggestions: string[],
        dontCare: [],
        dontCare: []
      ]
    >(youtubeSuggestionURLWithSearchKeyword, {
      adapter: axiosJsonpAdapter,
    })
  )

  if (
    youtubeSuggestionError ||
    !youtubeSuggestionResult ||
    !Array.isArray(youtubeSuggestionResult.data[1])
  ) {
    return null
  }

  return youtubeSuggestionResult.data[1]
}

// to recognize axios-jsonp typing: https://github.com/TypeStrong/ts-loader/issues/639
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path="../custom.d.ts"/>
import axios from "axios"
import { tcAsync } from "src/utilities/essentials"
// @ts-ignore
import axiosJsonpAdapter from "axios-jsonp"
import { ENV } from "src/environment"

/**
 *
 * @param searchKeyword keyword to get suggestions for
 * @returns null on error and list of suggestions on success
 */
export async function requestYoutubeSearchSuggestions(
  searchKeyword: string
): Promise<string[] | null> {
  const youtubeSuggestionURLWithSearchKeyword =
    ENV.YOUTUBE_SUGGESTION_URL.replace(`{}`, searchKeyword)

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

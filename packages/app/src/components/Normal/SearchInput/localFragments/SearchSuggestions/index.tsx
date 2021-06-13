import { x } from "@xstyled/styled-components"
import debounce from "lodash.debounce"
import React, { useEffect, useMemo, useState } from "react"
import { FC } from "react"
import { V } from "src/styles/styleFragments"
import { enhance, exhaustiveCheck } from "src/utilities/essentials"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"
import { requestYoutubeSearchSuggestions } from "src/utilities/youtube"
import { SearchSuggestionsFallback } from "./fallback"

/**
 * Strict typing, for exhausitive check
 */
const SearchSuggestionsUIState: {
  [AsyncStatus.NOT_STARTED]: AsyncStatus.NOT_STARTED
  [AsyncStatus.LOADING]: AsyncStatus.LOADING
  [AsyncStatus.FAILURE]: AsyncStatus.FAILURE
  NO_SUGGESTIONS: `NO_SUGGESTIONS`
  SHOW_SUGGESTIONS: `SHOW_SUGGESTIONS`
} = {
  [AsyncStatus.NOT_STARTED]: AsyncStatus.NOT_STARTED,
  [AsyncStatus.LOADING]: AsyncStatus.LOADING,
  [AsyncStatus.FAILURE]: AsyncStatus.FAILURE,
  NO_SUGGESTIONS: `NO_SUGGESTIONS`,
  SHOW_SUGGESTIONS: `SHOW_SUGGESTIONS`,
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchSuggestionsImpureProps = {
  searchKeyword: string
}

export const SearchSuggestionsImpure: FC<SearchSuggestionsImpureProps> =
  enhance<SearchSuggestionsImpureProps>(({ searchKeyword }) => {
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const [searchSuggestionsAsyncStatus, setSearchSuggestionsAsyncStatus] =
      useState<AsyncStatus>(AsyncStatus.NOT_STARTED)

    const debouncedRequestYoutubeSearchSuggestions = useMemo(() => {
      return debounce(async (searchKeyword) => {
        if (searchKeyword.trim().length === 0) return
        const suggestions = await requestYoutubeSearchSuggestions(
          searchKeyword.trim()
        )

        if (suggestions === null) {
          setSearchSuggestionsAsyncStatus(AsyncStatus.FAILURE)

          return
        }
        setSearchSuggestionsAsyncStatus(AsyncStatus.SUCCESS)
        setSearchSuggestions(suggestions)
      }, 350)
    }, [])

    useEffect(() => {
      if (searchKeyword.trim().length > 0) {
        setSearchSuggestionsAsyncStatus(AsyncStatus.LOADING)
      }
      debouncedRequestYoutubeSearchSuggestions(searchKeyword)
    }, [searchKeyword])

    const uiState: keyof typeof SearchSuggestionsUIState = useMemo(() => {
      if (
        searchSuggestionsAsyncStatus === AsyncStatus.NOT_STARTED ||
        searchSuggestionsAsyncStatus === AsyncStatus.LOADING ||
        searchSuggestionsAsyncStatus === AsyncStatus.FAILURE
      ) {
        return searchSuggestionsAsyncStatus
      }

      if (searchSuggestions.length === 0) {
        return SearchSuggestionsUIState.NO_SUGGESTIONS
      }

      return SearchSuggestionsUIState.SHOW_SUGGESTIONS
    }, [searchSuggestionsAsyncStatus, searchSuggestions])

    return (
      <SearchSuggestionsPure
        {...{
          searchSuggestions,
          searchSuggestionsAsyncStatus,
          uiState,
        }}
      />
    )
  })(SearchSuggestionsFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchSuggestionsPureProps = {
  searchSuggestions: string[]
  uiState: keyof typeof SearchSuggestionsUIState
}

export const SearchSuggestionsPure: FC<SearchSuggestionsPureProps> =
  enhance<SearchSuggestionsPureProps>(({ searchSuggestions, uiState }) => {
    return (
      <x.ul
        w="100%"
        minH="30px"
        borderStyle="solid"
        borderColor="secondary"
        borderWidth={2}
        borderRadius={5}
        borderTop="none"
        divideY
        divideColor="secondary"
      >
        {(() => {
          switch (uiState) {
            case SearchSuggestionsUIState.FAILURE:
              return <x.li {...V.lists.primary}>Error</x.li>
            case SearchSuggestionsUIState.LOADING:
              return <x.li {...V.lists.primary}>Loading</x.li>
            case SearchSuggestionsUIState.NO_SUGGESTIONS:
              return <x.li {...V.lists.primary}>No results</x.li>
            case SearchSuggestionsUIState.SHOW_SUGGESTIONS:
              return searchSuggestions.map((suggestion, i) => (
                <x.li {...V.lists.primary} key={i}>
                  {suggestion}
                </x.li>
              ))
            case SearchSuggestionsUIState.NOT_STARTED:
              return null
            default:
              exhaustiveCheck(uiState)
              return null
          }
        })()}
      </x.ul>
    )
  })(SearchSuggestionsFallback)

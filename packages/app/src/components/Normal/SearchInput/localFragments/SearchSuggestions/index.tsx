import { x } from "@xstyled/styled-components"
import debounce from "lodash.debounce"
import React, { useEffect, useMemo, useState } from "react"
import { FC } from "react"
import { SearchSuggestionImpure } from "src/components/Normal/SearchInput/localFragments/SearchSuggestion"
import { SF, V } from "src/styles/styleFragments"
import { enhance, exhaustiveCheck } from "src/utilities/essentials"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"
import { requestYoutubeSearchSuggestions } from "src/utilities/youtube"
import { DeepReadonly } from "ts-essentials"
import { SearchSuggestionsFallback } from "./fallback"

/**
 * Strict typing, for exhausitive check
 */
export const SearchSuggestionsUIState: DeepReadonly<{
  [AsyncStatus.NOT_STARTED]: AsyncStatus.NOT_STARTED
  [AsyncStatus.LOADING]: AsyncStatus.LOADING
  [AsyncStatus.FAILURE]: AsyncStatus.FAILURE
  NO_SUGGESTIONS: `NO_SUGGESTIONS`
  SHOW_SUGGESTIONS: `SHOW_SUGGESTIONS`
}> = {
  [AsyncStatus.NOT_STARTED]: AsyncStatus.NOT_STARTED,
  [AsyncStatus.LOADING]: AsyncStatus.LOADING,
  [AsyncStatus.FAILURE]: AsyncStatus.FAILURE,
  NO_SUGGESTIONS: `NO_SUGGESTIONS`,
  SHOW_SUGGESTIONS: `SHOW_SUGGESTIONS`,
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchSuggestionsImpureProps = {
  searchKeyword: string
  onSetCurrentFocusedSuggestionIndex?: (next?: number | null) => void
  currentFocusedSuggestionIndex?: null | number
  searchSuggestions: string[]
  onSetSearchSuggestions: (searchSuggestions: string[]) => void
}

export const SearchSuggestionsImpure: FC<SearchSuggestionsImpureProps> =
  enhance<SearchSuggestionsImpureProps>(
    ({
      searchKeyword,
      onSetCurrentFocusedSuggestionIndex,
      currentFocusedSuggestionIndex,
      searchSuggestions,
      onSetSearchSuggestions,
    }) => {
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
            onSetCurrentFocusedSuggestionIndex?.()

            return
          }
          setSearchSuggestionsAsyncStatus(AsyncStatus.SUCCESS)
          onSetSearchSuggestions(suggestions)
        }, 350)
      }, [onSetCurrentFocusedSuggestionIndex, onSetSearchSuggestions])

      useEffect(() => {
        if (searchKeyword.trim().length > 0) {
          setSearchSuggestionsAsyncStatus(AsyncStatus.LOADING)
          onSetCurrentFocusedSuggestionIndex?.()
        }
        debouncedRequestYoutubeSearchSuggestions(searchKeyword)
      }, [
        debouncedRequestYoutubeSearchSuggestions,
        onSetCurrentFocusedSuggestionIndex,
        searchKeyword,
      ])

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

      useEffect(() => {
        if (!onSetCurrentFocusedSuggestionIndex) return
        if (currentFocusedSuggestionIndex !== searchSuggestions.length) return

        onSetCurrentFocusedSuggestionIndex?.(0)
      }, [
        currentFocusedSuggestionIndex,
        onSetCurrentFocusedSuggestionIndex,
        searchSuggestions.length,
      ])

      return (
        <SearchSuggestionsPure
          {...{
            searchSuggestions,
            searchSuggestionsAsyncStatus,
            uiState,
            onSetCurrentFocusedSuggestionIndex,
            currentFocusedSuggestionIndex,
          }}
        />
      )
    }
  )(SearchSuggestionsFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchSuggestionsPureProps = {
  searchSuggestions: string[]
  uiState: keyof typeof SearchSuggestionsUIState
  currentFocusedSuggestionIndex?: number | null
}

export const SearchSuggestionsPure: FC<SearchSuggestionsPureProps> =
  enhance<SearchSuggestionsPureProps>(
    ({ searchSuggestions, uiState, currentFocusedSuggestionIndex }) => {
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
                  <x.div {...SF.fullWH} key={i}>
                    <SearchSuggestionImpure
                      suggestion={suggestion}
                      isForcefullyFocused={currentFocusedSuggestionIndex === i}
                    >
                      {suggestion}
                    </SearchSuggestionImpure>
                  </x.div>
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
    }
  )(SearchSuggestionsFallback)

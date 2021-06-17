import { x } from "@xstyled/styled-components"
import React, { useCallback, useEffect, useState } from "react"
import { FC } from "react"
import { useLocation } from "react-router-dom"
import { SearchInputPure } from "src/components/Normal/SearchInput"
import { SearchSuggestionsImpure } from "src/components/Normal/SearchInput/localFragments/SearchSuggestions"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { useBoolean } from "src/hooks/useBoolean"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultPageSearchInputImpureProps = {}

export const SearchResultPageSearchInputImpure: FC<SearchResultPageSearchInputImpureProps> =
  enhance<SearchResultPageSearchInputImpureProps>(() => {
    const query = new URLSearchParams(useLocation().search)
    const queryString = query.get(`search_query`)
    const [searchKeyword, setSearchKeyword] = useState(queryString ?? ``)
    const [
      areSuggestionsOpen,
      setSuggestionsOpenTrue,
      setSuggestionsOpenFalse,
    ] = useBoolean(false)

    useEffect(() => {
      setSearchKeyword(queryString ?? ``)
    }, [queryString])

    /**
     * It won't redirect to the search result page if blurred too quickly
     */
    const setSuggestionsOpenFalseDelayed = useCallback(() => {
      setTimeout(() => {
        setSuggestionsOpenFalse()
      }, 50)
    }, [setSuggestionsOpenFalse])

    const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback((e) => {
        setSearchKeyword(e.target.value)
      }, [])

    const onCutToClipboard = useCallback(() => {
      setSearchKeyword(``)
    }, [])

    return (
      <>
        <SearchInputPure
          {...{
            searchKeyword,
            onCutToClipboard,
            onSearchInputChange,
            onSearchInputBlurred: setSuggestionsOpenFalseDelayed,
            onSearchInputFocused: setSuggestionsOpenTrue,
            autoFocus: false,
          }}
        />
        {areSuggestionsOpen ? (
          <x.div position="relative">
            <x.div position="absolute" w="100%" zIndex={999}>
              <SearchSuggestionsImpure
                data-testid="search-suggestions"
                {...{
                  searchKeyword,
                }}
              />
            </x.div>
          </x.div>
        ) : null}
      </>
    )
  })(NullFallback)

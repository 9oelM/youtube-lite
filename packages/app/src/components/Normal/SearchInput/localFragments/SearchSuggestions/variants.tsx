/* istanbul ignore file */
import React, { FC, useCallback } from "react"
import { ComponentPropsWithRef, useState } from "react"
import { SearchSuggestionsImpure } from "src/components/Normal/SearchInput/localFragments/SearchSuggestions"

export const SearchSuggestionsImpureWithSuggestionsState: FC<
  Omit<
    ComponentPropsWithRef<typeof SearchSuggestionsImpure>,
    `searchSuggestions` | `onSetSearchSuggestions`
  >
> = (props) => {
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])

  const onSetSearchSuggestions = useCallback((suggestions) => {
    setSearchSuggestions(suggestions)
  }, [])

  return (
    <SearchSuggestionsImpure
      {...{
        ...props,
        searchSuggestions,
        onSetSearchSuggestions,
      }}
    />
  )
}

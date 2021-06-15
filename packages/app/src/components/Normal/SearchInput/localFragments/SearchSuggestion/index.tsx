import { x } from "@xstyled/styled-components"
import { push } from "connected-react-router"
import React, { useCallback } from "react"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { V } from "src/styles/styleFragments"
import { ClickHandler } from "src/types/react"
import { enhance } from "src/utilities/essentials"

export type SearchSuggestionImpureProps = {
  suggestion: string
}

export const SearchSuggestionImpure: FC<SearchSuggestionImpureProps> =
  enhance<SearchSuggestionImpureProps>(({ suggestion }) => {
    const dispatch = useDispatch()
    const onSuggestionClick = useCallback(() => {
      dispatch(push(`/results?search_query=${suggestion}`))
    }, [dispatch, suggestion])

    return (
      <SearchSuggestionPure
        {...{
          suggestion,
          onSuggestionClick,
        }}
      />
    )
  })(NullFallback)

export type SearchSuggestionPureProps = {
  suggestion: string
  onSuggestionClick: ClickHandler<HTMLLIElement>
}

export const SearchSuggestionPure: FC<SearchSuggestionPureProps> =
  enhance<SearchSuggestionPureProps>(({ suggestion, onSuggestionClick }) => {
    return (
      <x.li {...V.lists.primary} onClick={onSuggestionClick}>
        {suggestion}
      </x.li>
    )
  })(NullFallback)

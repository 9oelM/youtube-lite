import React from "react"
import { FC } from "react"
import { useSelector } from "react-redux"
import { SearchResultCardImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultItemsList/localFragments/SearchResultItem"
import { selectYoutubeSearchResultItemIndices } from "src/redux/ducks/ephemeral/ephemeralSelectors"
import { enhance } from "src/utilities/essentials"
import { SearchResultItemsListFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultItemsListImpureProps = {}

export const SearchResultItemsListImpure: FC<SearchResultItemsListImpureProps> =
  enhance<SearchResultItemsListImpureProps>(() => {
    const searchResultItems = useSelector(selectYoutubeSearchResultItemIndices)

    return (
      <>
        {searchResultItems.map((_, index) => {
          return <SearchResultCardImpure key={index} index={index} />
        })}
      </>
    )
  })(SearchResultItemsListFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultItemsListPureProps = {}

export const SearchResultItemsListPure: FC<SearchResultItemsListPureProps> =
  enhance<SearchResultItemsListPureProps>(() => {
    return null
  })(SearchResultItemsListFallback)

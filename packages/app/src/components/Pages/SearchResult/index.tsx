import { x } from "@xstyled/styled-components"
import { push } from "connected-react-router"
import React, { useEffect } from "react"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { SearchResultPageFallback } from "src/components/Pages/SearchResult/fallback"
import { SearchResultPageSearchInputImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput"
import { SearchResultSkeletonLoadingImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultSkeletonLoading"
import { YTLAsyncJobs } from "src/redux/ducks/async/asyncActions"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultPageImpureProps = {}

export const SearchResultPageImpure: FC<SearchResultPageImpureProps> =
  enhance<SearchResultPageImpureProps>(() => {
    const query = new URLSearchParams(useLocation().search)
    const dispatch = useDispatch()
    const queryString = query.get(`search_query`)

    useEffect(() => {
      if (!queryString) {
        dispatch(push(`/`))

        return
      }

      dispatch(
        YTLAsyncJobs.getSearchResult.start({
          payload: {
            searchQuery: queryString,
          },
        })
      )
    }, [dispatch, queryString])

    return <SearchResultPagePure />
  })(SearchResultPageFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultPagePureProps = {}

export const SearchResultPagePure: FC<SearchResultPagePureProps> =
  enhance<SearchResultPagePureProps>(() => {
    return (
      <x.main
        {...SF.flexStyles}
        {...SF.fullWH}
        bg="background"
        flexDirection="column"
      >
        <x.nav position="absolute" w={2 / 3} top="25px">
          <SearchResultPageSearchInputImpure />
        </x.nav>
        <x.div mt="80px" />
        <SearchResultSkeletonLoadingImpure />
      </x.main>
    )
  })(SearchResultPageFallback)

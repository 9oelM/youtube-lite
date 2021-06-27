import { x } from "@xstyled/styled-components"
import { push } from "connected-react-router"
import React, { useEffect } from "react"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { SearchResultPageFallback } from "src/components/Pages/SearchResult/fallback"
import { SearchResultItemsListImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultItemsList"
import { SearchResultPageSearchInputImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput"
import { SearchResultSkeletonLoadingImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultSkeletonLoading"
import {
  YTLAsyncJobs,
  YTLiteAsyncJobs,
} from "src/redux/ducks/async/asyncActions"
import { latestRequestByNameSelector } from "src/redux/ducks/async/asyncSelectors"
import { RootState } from "src/redux/reducers"
// import { YTLAsyncJobs } from "src/redux/ducks/async/asyncActions"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultPageImpureProps = {}

export const SearchResultPageImpure: FC<SearchResultPageImpureProps> =
  enhance<SearchResultPageImpureProps>(() => {
    const query = new URLSearchParams(useLocation().search)
    const dispatch = useDispatch()
    const queryString = query.get(`search_query`)

    const getSearchResultStatus: AsyncStatus | undefined = useSelector(
      (s: RootState) =>
        latestRequestByNameSelector(s, YTLiteAsyncJobs.GET_SEARCH_RESULT)
          ?.status
    )

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

    return (
      <SearchResultPagePure
        {...{
          getSearchResultStatus,
        }}
      />
    )
  })(SearchResultPageFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultPagePureProps = {
  getSearchResultStatus: AsyncStatus | undefined
}

export const SearchResultPagePure: FC<SearchResultPagePureProps> =
  enhance<SearchResultPagePureProps>(({ getSearchResultStatus }) => {
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
        {(() => {
          switch (getSearchResultStatus) {
            case AsyncStatus.LOADING: {
              return <SearchResultSkeletonLoadingImpure />
            }
            case AsyncStatus.FAILURE: {
              return <x.div>oops. request failed</x.div>
            }
            case AsyncStatus.SUCCESS: {
              return (
                <x.section
                  w={{ _: 2.8 / 3, md: 2.5 / 3, lg: 2 / 3 }}
                  overflowY="auto"
                >
                  <SearchResultItemsListImpure />
                </x.section>
              )
            }
            default:
              return null
          }
        })()}
      </x.main>
    )
  })(SearchResultPageFallback)

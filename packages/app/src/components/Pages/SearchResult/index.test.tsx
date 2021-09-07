import { mount } from "enzyme"
import React from "react"
import { Provider } from "react-redux"
import { act } from "react-test-renderer"
import {
  SearchResultPageImpure,
  SearchResultPagePure,
} from "src/components/Pages/SearchResult"
import { Mock } from "src/mock"
import { YTLAsyncJobs } from "src/redux/ducks/async/asyncActions"
import { configureMockStore, getByTestId } from "src/test-utilities/utilities"
import { asyncReducer } from "src/utilities/redux-async/asyncReducer"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"
import { useLocation } from "react-router-dom"
import { push } from "connected-react-router"

jest.mock(`react-router-dom`, () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: `/results`,
    search: `search_query=youtubelite`,
    hash: ``,
    state: null,
    key: `5nvxpbdafa`,
  }),
}))

describe(`SearchResultPageImpure`, () => {
  it(`should dispatch an async job to get youtube search result on mount if querystring is truthy`, async () => {
    const mockedStore = configureMockStore()({
      async: asyncReducer(undefined, { type: `NOOP` }),
    })
    const mounted = await mount(
      <Provider store={mockedStore}>
        <SearchResultPageImpure />
      </Provider>
    )
    // https://stackoverflow.com/questions/57006369/testing-asynchronous-useeffect
    await act(async () => {
      await Promise.resolve(mounted)
      await new Promise((resolve) => setTimeout(resolve))
      mounted.update()
    })
    expect(mockedStore.getActions()).toEqual([
      {
        ...YTLAsyncJobs.getSearchResult.start({
          payload: {
            searchQuery: `youtubelite`,
          },
        }),
        id: expect.any(String),
      },
    ])
  })
  it(`should dispatch push to / on mount if querystring is falsy`, async () => {
    // @ts-ignore
    useLocation.mockImplementation(() => ({
      pathname: `/results`,
      search: ``,
      hash: ``,
      state: null,
      key: `5nvxpbdafa`,
    }))
    const mockedStore = configureMockStore()({
      async: asyncReducer(undefined, { type: `NOOP` }),
    })
    const mounted = await mount(
      <Provider store={mockedStore}>
        <SearchResultPageImpure />
      </Provider>
    )
    await act(async () => {
      await Promise.resolve(mounted)
      await new Promise((resolve) => setTimeout(resolve))
      mounted.update()
    })
    expect(mockedStore.getActions()).toEqual([push(`/`)])
  })
})

describe(`SearchResultPagePure`, () => {
  const testCases = [
    {
      content: `failure message`,
      asyncStatus: AsyncStatus.FAILURE,
      expectedToContainTestId: `search-result-page-pure-failure`,
    },
    {
      content: `loading animation`,
      asyncStatus: AsyncStatus.LOADING,
      expectedToContainTestId: `search-result-skeleton-loading-pure`,
    },
    {
      content: `fetched youtube search results`,
      asyncStatus: AsyncStatus.SUCCESS,
      expectedToContainTestId: `search-result-page-pure-success`,
    },
    {
      content: `Nothing`,
      asyncStatus: AsyncStatus.NOT_STARTED,
      expectedToContainTestId: null,
    },
    {
      content: `Nothing`,
      asyncStatus: AsyncStatus.CANCELLED,
      expectedToContainTestId: null,
    },
  ]
  const testIdsFromAllTruthyCases = testCases
    .map(({ expectedToContainTestId }) => expectedToContainTestId)
    .filter(Boolean) as string[]
  it.each(testCases)(
    `shows $content when it's $asyncStatus`,
    ({ expectedToContainTestId, asyncStatus }) => {
      const mockedStore = configureMockStore()({
        ephemeral: {
          youtubeSearchResultItems: Mock.youtubeSearchResult.items,
        },
      })
      const mounted = mount(
        <Provider store={mockedStore}>
          <SearchResultPagePure getSearchResultStatus={asyncStatus} />
        </Provider>
      )

      if (expectedToContainTestId)
        expect(
          getByTestId(mounted, expectedToContainTestId).length
        ).toBeGreaterThan(0)
      else {
        for (const testid of testIdsFromAllTruthyCases) {
          expect(getByTestId(mounted, testid).length).toBe(0)
        }
      }
    }
  )
})

import { mount } from "enzyme"
import React from "react"
import { WatchPageImpure, WatchPagePure } from "src/components/Pages/Watch"
import { Provider } from "react-redux"
import { configureMockStore } from "src/test-utilities/utilities"
import { useLocation } from "react-router-dom"
import { push } from "connected-react-router"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"

jest.mock(`react-router-dom`, () => ({
  useLocation: jest.fn(),
}))

describe(`WatchPageImpure`, () => {
  it(`should push to root url when there is no videoIdQuerySrtring`, async () => {
    // @ts-ignore
    useLocation.mockImplementation(() => ({
      pathname: `/watch`,
      search: ``,
      hash: ``,
      state: null,
      key: `5nvxpbdafa`,
    }))
    const mockedStore = configureMockStore()()
    const a = await mount(
      <Provider store={mockedStore}>
        <WatchPageImpure />
      </Provider>
    )
    expect(mockedStore.getActions()).toContainEqual(push(`/`))
    // although not seen by the user
    expect(a.text()).toContain(`Fail`)
  })

  it(`should display something else when videoIdQueryString is defined`, async () => {
    // @ts-ignore
    useLocation.mockImplementation(() => ({
      pathname: `/watch`,
      search: `v=1234`,
      hash: ``,
      state: null,
      key: `5nvxpbdafa`,
    }))

    const mockedStore = configureMockStore()()
    const a = await mount(
      <Provider store={mockedStore}>
        <WatchPageImpure />
      </Provider>
    )
    expect(mockedStore.getActions()).toEqual([])
    // although not seen by the user
    expect(a.text()).not.toContain(`Fail`)
  })
})

// Impure components inside of a pure component should be tested in isolation
// Mock them for the pure component test
jest.mock(`src/components/Pages/Watch/localFragments/VideoPlayer`)
jest.mock(
  `src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput`
)
describe(`WatchPagePure`, () => {
  it(`should display loader animation when loading the video`, () => {
    const mounted = mount(
      <WatchPagePure
        {...{
          videoId: `1234`,
          onVideoPlayerError: jest.fn(),
          onVideoPlayerReady: jest.fn(),
          videoPlayerStatus: AsyncStatus.LOADING,
        }}
      />
    )
    expect(mounted.text().toLowerCase()).toContain(`loading`)
  })
  it(`should display failure message when failed to load the video`, () => {
    const mounted = mount(
      <WatchPagePure
        {...{
          videoId: `1234`,
          onVideoPlayerError: jest.fn(),
          onVideoPlayerReady: jest.fn(),
          videoPlayerStatus: AsyncStatus.FAILURE,
        }}
      />
    )
    expect(mounted.text().toLowerCase()).toContain(`fail`)
  })
  it(`should display nothing if videoPlayerStatus is not LOADING or FAILURE`, () => {
    const mounted = mount(
      <WatchPagePure
        {...{
          videoId: `1234`,
          onVideoPlayerError: jest.fn(),
          onVideoPlayerReady: jest.fn(),
          videoPlayerStatus: AsyncStatus.CANCELLED,
        }}
      />
    )
    expect(mounted.text()).toEqual(``)
  })
})

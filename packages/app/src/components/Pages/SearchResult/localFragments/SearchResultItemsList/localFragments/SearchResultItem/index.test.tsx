/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { push } from "connected-react-router"
import { mount } from "enzyme"
import React from "react"
import { Provider } from "react-redux"
import {
  SearchResultCardImpure,
  SearchResultCardPure,
} from "src/components/Pages/SearchResult/localFragments/SearchResultItemsList/localFragments/SearchResultItem"
import { Mock } from "src/mock"
import { configureMockStore, getByTestId } from "src/test-utilities/utilities"
import { YoutubeSearchItem } from "src/types/youtube"

describe(`SearchResultCardPure`, () => {
  const getProps = () => ({
    onClickSearchResultItem: jest.fn(),
    thumbnail:
      // ts is stupid enough to think that this is a string and not YoutubeSearchItem[`snippet`][`thumbnails`][`default`][`url`]
      Mock.youtubeSearchResult.items[0]!.snippet.thumbnails.default
        .url as YoutubeSearchItem[`snippet`][`thumbnails`][`default`][`url`],
    title: Mock.youtubeSearchResult.items[0]!.snippet.title,
    description: Mock.youtubeSearchResult.items[0]!.snippet.description,
  })
  it(`should call onClickSearchResultItem when outermost container is clicked`, () => {
    const props = getProps()
    expect(props.onClickSearchResultItem).toHaveBeenCalledTimes(0)
    const Component = <SearchResultCardPure {...props} />
    const wrapper = mount(Component)
    getByTestId(wrapper, `search-result-card-pure`).at(0).simulate(`click`)
    expect(props.onClickSearchResultItem).toHaveBeenCalledTimes(1)
  })

  it.each([getProps().title, getProps().description])(
    `should show %p`,
    (searchResultInfo) => {
      const props = getProps()
      const Component = <SearchResultCardPure {...props} />
      const wrapper = mount(Component)
      expect(wrapper.text()).toContain(searchResultInfo)
    }
  )

  it(`should show thumbnail`, () => {
    const props = getProps()
    const Component = <SearchResultCardPure {...props} />
    const wrapper = mount(Component)
    expect(
      getByTestId(wrapper, `search-result-card-pure-thumbnail`)
        .at(0)
        .prop(`src`)
    ).toEqual(props.thumbnail)
  })
})

describe(`SearchResultCardImpure`, () => {
  it(`should not display anything when youtubeSearchResultItem is undefined`, () => {
    const props = {
      index: 9999999999999999,
    }
    const mockedStore = configureMockStore()({
      ephemeral: {
        youtubeSearchResultItems: [],
      },
    })

    const Component = (
      <Provider store={mockedStore}>
        <SearchResultCardImpure {...props} />
      </Provider>
    )
    const wrapper = mount(Component)
    expect(wrapper.html()).toBe(``)
  })
  it(`should display non-null html when youtubeSearchResultItem defined`, () => {
    const props = {
      index: 0,
    }
    const mockedStore = configureMockStore()({
      ephemeral: {
        youtubeSearchResultItems: Mock.youtubeSearchResult.items,
      },
    })

    const Component = (
      <Provider store={mockedStore}>
        <SearchResultCardImpure {...props} />
      </Provider>
    )
    const wrapper = mount(Component)
    expect(wrapper.html()).not.toBe(``)
  })
  it(`should call onClickSearchResultItem without early return when youtueSearchItem defined`, () => {
    const mockedStore = configureMockStore()({
      ephemeral: {
        youtubeSearchResultItems: Mock.youtubeSearchResult.items,
      },
    })

    const Component = (
      <Provider store={mockedStore}>
        <SearchResultCardImpure
          {...{
            index: 0,
          }}
        />
      </Provider>
    )
    const wrapper = mount(Component)

    getByTestId(wrapper, `search-result-card-pure`).at(0).simulate(`click`)

    expect(mockedStore.getActions()).toEqual([push(expect.anything())])
    const [pushAction]: ReturnType<typeof push>[] = mockedStore.getActions()
    expect(String(pushAction?.payload.args).startsWith(`/watch?v=`)).toBe(true)
  })
})

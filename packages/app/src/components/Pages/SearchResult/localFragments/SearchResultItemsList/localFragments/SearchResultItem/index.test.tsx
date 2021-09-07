/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { mount } from "enzyme"
import React from "react"
import { SearchResultCardPure } from "src/components/Pages/SearchResult/localFragments/SearchResultItemsList/localFragments/SearchResultItem"
import { Mock } from "src/mock"
import { getByTestId } from "src/test-utilities/utilities"
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

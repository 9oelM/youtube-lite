import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { useSelector } from "react-redux"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { selectYoutubeSearchResultItemFromIndex } from "src/redux/ducks/ephemeral/ephemeralSelectors"
import { RootState } from "src/redux/reducers"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultCardImpureProps = {
  index: number
}

export const SearchResultCardImpure: FC<SearchResultCardImpureProps> =
  enhance<SearchResultCardImpureProps>(({ index }) => {
    const youtubeSearchResultItem = useSelector((s: RootState) =>
      selectYoutubeSearchResultItemFromIndex(s, index)
    )

    if (!youtubeSearchResultItem) return null

    return (
      <SearchResultCardPure
        {...{
          thumbnail: youtubeSearchResultItem.snippet.thumbnails.default.url,
          title: youtubeSearchResultItem.snippet.title,
        }}
      />
    )
  })(NullFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultCardPureProps = {
  thumbnail: string
  title: string
}

export const SearchResultCardPure: FC<SearchResultCardPureProps> =
  enhance<SearchResultCardPureProps>(({ thumbnail, title }) => {
    return (
      <x.article
        w="100%"
        bg="background"
        p={2}
        {...SF.flexStyles}
        spaceX={4}
        borderStyle="solid"
        borderWidth="2px"
        borderRadius={5}
        borderColor={{ _: `transparent`, hover: `accent` }}
        transition="border-color 300ms"
        cursor="pointer"
        justifyContent="flex-start"
      >
        <x.img src={thumbnail} loading="lazy" />
        <x.div {...SF.flexStyles}>
          <x.h2 color="text">{title}</x.h2>
        </x.div>
      </x.article>
    )
  })(NullFallback)

import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { useSelector } from "react-redux"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { selectYoutubeSearchResultItemFromIndex } from "src/redux/ducks/ephemeral/ephemeralSelectors"
import { RootState } from "src/redux/reducers"
import { SF } from "src/styles/styleFragments"
import { YoutubeSearchItem } from "src/types/youtube"
import { enhance } from "src/utilities/essentials"
import { decodeHtml } from "src/utilities/html"

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
          thumbnail: youtubeSearchResultItem.snippet.thumbnails.high.url,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: decodeHtml(youtubeSearchResultItem.snippet.title)!.trim(),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          description: decodeHtml(
            youtubeSearchResultItem.snippet.description
          )!.trim(),
        }}
      />
    )
  })(NullFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultCardPureProps = {
  thumbnail: YoutubeSearchItem[`snippet`][`thumbnails`][`default`][`url`]
  title: YoutubeSearchItem[`snippet`][`title`]
  description: YoutubeSearchItem[`snippet`][`description`]
}

export const SearchResultCardPure: FC<SearchResultCardPureProps> =
  enhance<SearchResultCardPureProps>(({ thumbnail, title, description }) => {
    return (
      <x.article
        boxShadow={{ _: `xl`, hover: `2xl` }}
        w="100%"
        bg={{ _: `true-gray-800`, hover: `true-gray-700` }}
        pt={2}
        pr={2}
        pb={2}
        mt={2}
        mb={2}
        {...SF.flexStyles}
        flexDirection={{ _: `column`, md: `row` }}
        transition="all 300ms"
        cursor="pointer"
        justifyContent="flex-start"
        maxH={{ _: `auto`, md: `150px` }}
        borderRadius={6}
        divideX={16}
        divideColor={{ _: `true-gray-800`, hover: `true-gray-700` }}
        divideY={{ _: 16, md: 0 }}
      >
        <x.img
          src={thumbnail}
          objectFit="contain"
          maxW={`200px`}
          loading="lazy"
          borderRadius={6}
        />
        <x.div
          {...SF.flexStyles}
          flexDirection="column"
          // for transition of divideColor
          transition="border 300ms"
          w={{ _: 1, md: `auto` }}
        >
          <x.h2
            color="text"
            fontSize={{ _: `xl`, md: `xl`, lg: `2xl` }}
            w={1}
            textAlign="left"
          >
            {title}
          </x.h2>
          <x.p
            color="text"
            fontSize={{ _: `xs`, md: `sm`, lg: `base` }}
            w={1}
            mt={{ _: 2, md: 5 }}
          >
            {description}
          </x.p>
        </x.div>
      </x.article>
    )
  })(NullFallback)

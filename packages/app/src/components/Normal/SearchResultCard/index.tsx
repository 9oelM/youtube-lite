import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultCardImpureProps = {}

export const SearchResultCardImpure: FC<SearchResultCardImpureProps> =
  enhance<SearchResultCardImpureProps>(() => {
    return (
      <SearchResultCardPure
        {...{
          thumbnail: ``,
          title: ``,
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
        bg="muted"
        p={5}
        {...SF.flexStyles}
        spaceX={4}
        justifyContent="flex-start"
      >
        <x.img src={thumbnail} loading="lazy" />
        <x.div {...SF.flexStyles}>
          <x.h2>{title}</x.h2>
        </x.div>
      </x.article>
    )
  })(NullFallback)

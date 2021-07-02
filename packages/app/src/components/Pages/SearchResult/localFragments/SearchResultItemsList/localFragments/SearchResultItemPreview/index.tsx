import React from "react"
import { FC } from "react"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultItemPreviewImpureProps = {}

export const SearchResultItemPreviewImpure: FC<SearchResultItemPreviewImpureProps> =
  enhance<SearchResultItemPreviewImpureProps>(() => {
    return <SearchResultItemPreviewPure />
  })(NullFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultItemPreviewPureProps = {}

export const SearchResultItemPreviewPure: FC<SearchResultItemPreviewPureProps> =
  enhance<SearchResultItemPreviewPureProps>(() => {
    return null
  })(NullFallback)

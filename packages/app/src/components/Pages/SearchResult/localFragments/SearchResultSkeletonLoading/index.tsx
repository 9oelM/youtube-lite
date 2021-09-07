import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultSkeletonLoadingImpureProps = {}

export const SearchResultSkeletonLoadingImpure: FC<SearchResultSkeletonLoadingImpureProps> =
  enhance<SearchResultSkeletonLoadingImpureProps>(() => {
    return <SearchResultSkeletonLoadingPure />
  })(NullFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchResultSkeletonLoadingPureProps = {}

export const SearchResultSkeletonLoadingPure: FC<SearchResultSkeletonLoadingPureProps> =
  enhance<SearchResultSkeletonLoadingPureProps>(() => {
    return (
      <x.section
        w={2 / 3}
        h={{
          _: `calc(100% - 80px)`,
        }}
        spaceY={4}
        {...SF.flexStyles}
        flexDirection="column"
        justifyContent="space-around"
        overflow="hidden"
        data-testid="search-result-skeleton-loading-pure"
      >
        {[0, 1, 2, 3, 4, 5].map((num) => {
          return (
            <x.div
              animation="pulse"
              display="flex"
              spaceX={4}
              key={num}
              w="100%"
            >
              <x.div
                bg="text"
                w={{ _: 70, md: 150, lg: 200 }}
                h={{ _: 70 * 0.75, md: 150 * 0.75, lg: 200 * 0.75 }}
                borderRadius
              />
              <x.div flex="1" spaceY={4} py={1}>
                <x.div
                  h={{
                    _: 6,
                    md: 8,
                    lg: 10,
                  }}
                  bg="text"
                  borderRadius
                  w={3 / 4}
                />
                <x.div spaceY={2}>
                  <x.div h={{ _: 2, md: 4 }} bg="text" borderRadius />
                  <x.div h={{ _: 2, md: 4 }} bg="text" borderRadius w={5 / 6} />
                </x.div>
              </x.div>
            </x.div>
          )
        })}
      </x.section>
    )
  })(NullFallback)

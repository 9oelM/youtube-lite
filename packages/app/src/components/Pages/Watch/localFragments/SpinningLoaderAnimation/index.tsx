/* istanbul ignore file */
import { LoaderAlt } from "@styled-icons/boxicons-regular"
import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SpinningLoaderAnimationPureProps = {}

export const SpinningLoaderAnimationPure: FC<SpinningLoaderAnimationPureProps> =
  enhance<SpinningLoaderAnimationPureProps>(() => {
    return (
      <x.article {...SF.flexStyles} flexDirection="column" spaceY={2}>
        <x.div
          animation="0.5s x-spin linear infinite"
          h={{
            _: `2rem`,
            md: `2.5rem`,
            lg: `3rem`,
          }}
          w={{
            _: `2rem`,
            md: `2.5rem`,
            lg: `3rem`,
          }}
        >
          <LoaderAlt height="100%" width="100%" color="text" />
        </x.div>
        <x.p color="text">Loading</x.p>
      </x.article>
    )
  })(NullFallback)

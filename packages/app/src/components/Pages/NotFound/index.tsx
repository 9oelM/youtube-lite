import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { SF, V } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
import { NotFoundPageFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NotFoundPageImpureProps = {}

export const NotFoundPageImpure: FC<NotFoundPageImpureProps> =
  enhance<NotFoundPageImpureProps>(() => {
    return <NotFoundPagePure></NotFoundPagePure>
  })(NotFoundPageFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type NotFoundPagePureProps = {}

export const NotFoundPagePure: FC<NotFoundPagePureProps> =
  enhance<NotFoundPagePureProps>(() => (
    <x.div bg="background" w="100%" h="100%" {...SF.flexStyles}>
      <x.main {...SF.flexStyles} flexDirection="column" spaceY={4}>
        <x.p color="text" fontSize="4xl" fontWeight="bold" textAlign="center">
          Oops. Probably a wrong page.
        </x.p>
        <x.button {...V.buttons.primary}>Go back to the main page</x.button>
      </x.main>
    </x.div>
  ))(NotFoundPageFallback)

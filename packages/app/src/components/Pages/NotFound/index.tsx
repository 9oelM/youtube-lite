import { x } from "@xstyled/styled-components"
import { push } from "connected-react-router"
import React, { useCallback } from "react"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { SF, V } from "src/styles/styleFragments"
import { ClickHandler } from "src/types/react"
import { enhance } from "src/utilities/essentials"
import { NotFoundPageFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NotFoundPageImpureProps = {}

export const NotFoundPageImpure: FC<NotFoundPageImpureProps> =
  enhance<NotFoundPageImpureProps>(() => {
    const dispatch = useDispatch()
    const onGoBackToMainPageClick: ClickHandler = useCallback(() => {
      dispatch(push(`/`))
    }, [dispatch])

    return (
      <NotFoundPagePure
        onGoBackToMainPageClick={onGoBackToMainPageClick}
      ></NotFoundPagePure>
    )
  })(NotFoundPageFallback)

export type NotFoundPagePureProps = {
  onGoBackToMainPageClick: ClickHandler
}

export const NotFoundPagePure: FC<NotFoundPagePureProps> =
  enhance<NotFoundPagePureProps>(({ onGoBackToMainPageClick }) => (
    <x.div bg="background" {...SF.fullWH} {...SF.flexStyles}>
      <x.main {...SF.flexStyles} flexDirection="column" spaceY={4}>
        <x.p color="text" fontSize="4xl" fontWeight="bold" textAlign="center">
          Oops. Probably a wrong page.
        </x.p>
        <x.button
          data-testid="go-back-button"
          onClick={onGoBackToMainPageClick}
          {...V.buttons.primary}
        >
          Go back to the main page
        </x.button>
      </x.main>
    </x.div>
  ))(NotFoundPageFallback)

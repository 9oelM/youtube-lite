/* istanbul ignore file */
import React, { ReactNode, useCallback, useMemo, useState } from "react"
import { FC } from "react"
import { enhance } from "src/utilities/essentials"
import { FloatingActionButtonFallback } from "./fallback"
import { x } from "@xstyled/styled-components"
import { Minus } from "@styled-icons/boxicons-regular/Minus"
import { Add } from "@styled-icons/material-sharp/Add"
import { V } from "src/styles/styleFragments"
import { PlaylistPlay } from "@styled-icons/material-sharp"
import { Settings } from "@styled-icons/material-sharp"
import { Information } from "@styled-icons/ionicons-sharp"

export type Menu = {
  icon: ReactNode
  onClick: () => void
}

// enum MenuType {
//   DEFAULT,
//   PLAYLIST,
//   SETTINGS,
//   INFO,
// }

export type FloatingActionButtonImpureProps = {
  //
}

export const FloatingActionButtonImpure: FC<FloatingActionButtonImpureProps> =
  enhance<FloatingActionButtonImpureProps>(() => {
    const [isActive, setIsActive] = useState(false)

    const onClickFloatingButton = useCallback(() => {
      setIsActive((prev) => !prev)
    }, [])

    const menus = useMemo(
      () => [
        {
          icon: <PlaylistPlay />,
          onClick: () => {
            //
          },
        },
        {
          icon: <Settings />,
          onClick: () => {
            //
          },
        },
        {
          icon: <Information />,
          onClick: () => {
            //
          },
        },
      ],
      []
    )

    return (
      <x.div>
        <FloatingActionButtonPure
          icon={isActive ? <Minus /> : <Add />}
          onClick={onClickFloatingButton}
          active={true}
          index={-1}
        />
        {menus.map((menu, idx) => (
          <FloatingActionButtonPure
            key={idx}
            icon={menu.icon}
            onClick={menu.onClick}
            active={isActive}
            index={idx}
          />
        ))}
      </x.div>
    )
  })(FloatingActionButtonFallback)

export type FloatingActionButtonPureProps = {
  icon: ReactNode
  onClick: () => void
  active: boolean
  index: number
}

export const FloatingActionButtonPure: FC<FloatingActionButtonPureProps> =
  enhance<FloatingActionButtonPureProps>(({ icon, onClick, active, index }) => {
    return (
      <x.button
        onClick={onClick}
        {...V.buttons.floating}
        w={active ? `55` : `0`}
        h={active ? `55` : `0`}
        opacity={active ? `1` : `0`}
        transform={`translateX(50%) translateY(-${(index + 1) * 150}%)`}
      >
        {icon}
      </x.button>
    )
  })(FloatingActionButtonFallback)

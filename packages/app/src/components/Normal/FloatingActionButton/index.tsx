import React, { ReactNode, useCallback, useState } from "react"
import { FC } from "react"
import { enhance } from "src/utilities/essentials"
import { FloatingActionButtonFallback } from "./fallback"
import { x } from "@xstyled/styled-components"
import { Plus } from "@styled-icons/boxicons-regular/Plus"
import { Minus } from "@styled-icons/boxicons-regular/Minus"
import { SF, V } from "src/styles/styleFragments"

export type Menu = {
  icon: ReactNode
  onClick: () => void
}

export type FloatingActionButtonImpureProps = {
  menus: Menu[]
}

export const FloatingActionButtonImpure: FC<FloatingActionButtonImpureProps> =
  enhance<FloatingActionButtonImpureProps>(({ menus }) => {
    const [isActive, setIsActive] = useState(false)

    const onClickFloatingButton: React.MouseEventHandler<HTMLButtonElement> =
      useCallback(() => {
        setIsActive(!isActive)
      }, [isActive])

    return (
      <x.div {...SF.transition}>
        <FloatingActionButtonPure
          icon={isActive ? <Minus /> : <Plus />}
          onClick={onClickFloatingButton}
          active={true}
          nth={-1}
        />
        {menus.map((menu, idx) => (
          <FloatingActionButtonPure
            key={idx}
            icon={menu.icon}
            onClick={menu.onClick}
            active={isActive}
            nth={idx}
          />
        ))}
      </x.div>
    )
  })(FloatingActionButtonFallback)

export type FloatingActionButtonPureProps = {
  icon: ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
  active: boolean
  nth: number
}

export const FloatingActionButtonPure: FC<FloatingActionButtonPureProps> =
  enhance<FloatingActionButtonPureProps>(({ icon, onClick, active, nth }) => {
    return (
      <x.button
        onClick={onClick}
        {...V.buttons.floating}
        w={active ? `55` : `0`}
        h={active ? `55` : `0`}
        opacity={active ? `1` : `0`}
        transform={`translateX(50%) translateY(-${(nth + 1) * 150}%)`}
      >
        {icon}
      </x.button>
    )
  })(FloatingActionButtonFallback)

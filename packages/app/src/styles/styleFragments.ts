import { x } from "@xstyled/styled-components"
import { ComponentPropsWithRef } from "react"

function makeStyleFragments<Keys extends string>(
  sf: Record<Keys, ComponentPropsWithRef<typeof x.div>>
): Record<Keys, ComponentPropsWithRef<typeof x.div>> {
  return sf
}

export const SF = makeStyleFragments({
  flexStyles: {
    alignItems: `center`,
    justifyContent: `center`,
    display: `flex`,
  },
  fullWH: {
    w: `100%`,
    h: `100%`,
  },
})

// variants
export const V = {
  buttons: {
    primary: {
      bg: { _: `background`, hover: `accent` },
      color: { _: `accent`, hover: `background` },
      borderRadius: `lg`,
      padding: { _: 1.5 },
      borderColor: { _: `accent`, hover: `` },
      borderWidth: { _: 2 },
      transition: `all 0.3s`,
    },
    floating: {
      position: `absolute`,
      bottom: `5vh`,
      right: `10vh`,
      bg: { _: `background`, hover: `accent` },
      color: { _: `accent`, hover: `background` },
      borderRadius: `full`,
      borderWidth: { _: 2 },
      transition: `all 0.3s`,
      outline: { _: `none`, focus: `none` },
      fontSize: `xl`,
    },
  },
  inputs: {
    primary: {
      bg: { _: `background`, focus: `background` },
      borderColor: { _: `secondary`, focus: `accent` },
      borderRadius: `lg`,
      borderStyle: `solid`,
      padding: 1.5,
      borderWidth: 2,
      transition: `all 0.3s`,
      color: `text`,
    },
  },
  lists: {
    primary: {
      color: { _: `text`, hover: `accent` },
      p: 1.5,
      cursor: `pointer`,
      transition: `color 0.3s`,
    },
  },
}

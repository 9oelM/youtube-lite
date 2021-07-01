import { defaultTheme } from "@xstyled/styled-components"
import type { ColorMode, Theme } from "theme-ui"
import { DeepRequired } from "ts-essentials"
// https://theme-ui.com/guides/typescript#exact-theme-type
const makeTheme = <T extends Theme>(t: T) => t
const makeXStyledTheme = <T extends typeof defaultTheme>(t: T) => t

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleTheme = makeTheme({
  colors: {
    /**
     * these first-level keys in `colors` object should
     * all be in `dark` or any other color modes objects.
     */
    text: `#000`,
    background: `#fff`,
    primary: `#07c`,
    secondary: `#05a`,
    accent: `#609`,
    muted: `#f6f6f6`,
    modes: {
      dark: {
        text: `#fff`,
        background: `#000`,
        primary: `#0cf`,
        secondary: `#09c`,
        muted: `#111`,
      },
      papaya: {
        // this color mode will fallback to the root color object
        // for values not defined here
        text: `#433`,
        background: `papayawhip`,
      },
    },
  },
  fonts: {
    body: `system-ui, sans-serif`,
    heading: `system-ui, sans-serif`,
    monospace: `Menlo, monospace`,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  // variants can use custom, user-defined names
  text: {
    heading: {
      /**
       * @usage
       * ```
       * <h1
          sx={{
            variant: 'text.heading',
          }}>
          Hello
        </h1>
       * ```
       */
      fontFamily: `heading`,
      lineHeight: `heading`,
      fontWeight: `heading`,
    },
    caps: {
      textTransform: `uppercase`,
      letterSpacing: `0.1em`,
    },
  },
  // variants for buttons
  buttons: {
    primary: {
      // you can reference other values defined in the theme
      color: `white`,
      bg: `primary`,
    },
    secondary: {
      color: `text`,
      bg: `secondary`,
    },
  },
})

// https://coolors.co/000000-14213d-fca311-e5e5e5-ffffff
const charismaSunset: Omit<DeepRequired<ColorMode>, `primary` | `highlight`> = {
  background: `#1A1B1B`,
  muted: `#14213d`,
  accent: `#fca311`,
  text: `#92999c`,
  secondary: `#303436`,
}

export const youtubeLiteTheme = makeXStyledTheme({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    ...charismaSunset,
  },
})

export type ExactTheme = typeof youtubeLiteTheme

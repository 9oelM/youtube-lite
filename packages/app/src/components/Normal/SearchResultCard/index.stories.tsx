import React from "react"

import { Meta, Story } from "@storybook/react"
import { SearchResultCardPure, SearchResultCardPureProps } from "."
import { youtubeLiteTheme } from "src/styles/theme"
import { ThemeProvider } from "@xstyled/styled-components"

const Template: Story<SearchResultCardPureProps> = (
  args: SearchResultCardPureProps
) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <SearchResultCardPure {...args} />
  </ThemeProvider>
)

export const Example: Story<SearchResultCardPureProps> = Template.bind({})
Example.args = {
  thumbnail: `https://picsum.photos/seed/picsum/300/200`,
  title: `test`,
}

export default {
  title: `SearchResultCard`,
  component: SearchResultCardPure,
  parameters: {
    layout: `centered`,
    actions: {
      handles: [`click`],
    },
  },
  argTypes: {
    color: { control: `color` },
  },
} as Meta

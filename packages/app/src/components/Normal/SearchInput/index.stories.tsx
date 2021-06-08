import React from "react"

import { Meta, Story } from "@storybook/react"
import { SearchInputImpure, SearchInputImpureProps } from "."
import { ThemeProvider } from "styled-components"
import { youtubeLiteTheme } from "src/styles/theme"
import { x } from "@xstyled/styled-components"
import { SF } from "src/styles/styleFragments"

const Template: Story<SearchInputImpureProps> = (
  args: SearchInputImpureProps
) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <x.div bg="background" {...SF.fullWH} {...SF.flexStyles}>
      <SearchInputImpure {...args} />
    </x.div>

    {` `}
  </ThemeProvider>
)

export const Example: Story<SearchInputImpureProps> = Template.bind({})
Example.args = {}

export default {
  title: `SearchInput`,
  component: SearchInputImpure,
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

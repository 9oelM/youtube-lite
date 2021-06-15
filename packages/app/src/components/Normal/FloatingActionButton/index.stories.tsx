import React from "react"

import { Meta, Story } from "@storybook/react"
import { ThemeProvider } from "styled-components"
import { youtubeLiteTheme } from "src/styles/theme"
import { x } from "@xstyled/styled-components"
import { SF } from "src/styles/styleFragments"
import { FloatingActionButtonImpure, FloatingActionButtonImpureProps } from "."

const Template: Story<FloatingActionButtonImpureProps> = (
  args: FloatingActionButtonImpureProps
) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <x.div bg="background" {...SF.fullWH} {...SF.flexStyles}>
      <FloatingActionButtonImpure {...args} />
    </x.div>

    {` `}
  </ThemeProvider>
)

export const Example: Story<FloatingActionButtonImpureProps> = Template.bind({})
Example.args = {}

export default {
  title: `FloatingActionButtonImpure`,
  component: FloatingActionButtonImpure,
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

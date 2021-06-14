import React from "react"

import { Meta, Story } from "@storybook/react"
import { ThemeProvider } from "styled-components"
import { youtubeLiteTheme } from "src/styles/theme"
import { x } from "@xstyled/styled-components"
import { SF } from "src/styles/styleFragments"
import { FloatingActionButtonImpure, FloatingActionButtonImpureProps } from "."

const Template: Story<FloatingActionButtonImPureProps> = (
  args: FloatingActionButtonImPureProps
) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <x.div bg="background" {...SF.fullWH} {...SF.flexStyles}>
      <FloatingActionButtonImPure {...args} />
    </x.div>

    {` `}
  </ThemeProvider>
)

export const Example: Story<FloatingActionButtonImPureProps> = Template.bind({})
Example.args = {}

export default {
  title: `FloatingActionButtonImpure`,
  component: FloatingActionButtonImPure,
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

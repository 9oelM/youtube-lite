import React from "react"

import { Meta, Story } from "@storybook/react"
import { NameImpure, NameImpureProps } from "."
import { youtubeLiteTheme } from "src/styles/theme"
import { ThemeProvider } from "@xstyled/styled-components"

const Template: Story<NameImpureProps> = (args: NameImpureProps) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <NameImpure {...args} />
  </ThemeProvider>
)

export const Example: Story<NameImpureProps> = Template.bind({})
Example.args = {}

export default {
  title: `Name`,
  component: NameImpure,
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

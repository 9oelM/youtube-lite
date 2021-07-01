import React from "react"

import { Meta, Story } from "@storybook/react"
import { NameImpure, NameImpureProps } from "."
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<NameImpureProps> = (args: NameImpureProps) => (
  <WithCustomTheme>
    <NameImpure {...args} />
  </WithCustomTheme>
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

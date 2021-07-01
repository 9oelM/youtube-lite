import React from "react"

import { Meta, Story } from "@storybook/react"
import { x } from "@xstyled/styled-components"
import { SF } from "src/styles/styleFragments"
import { FloatingActionButtonImpure, FloatingActionButtonImpureProps } from "."
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<FloatingActionButtonImpureProps> = (
  args: FloatingActionButtonImpureProps
) => (
  <WithCustomTheme>
    <x.div bg="background" {...SF.fullWH} {...SF.flexStyles}>
      <FloatingActionButtonImpure {...args} />
    </x.div>

    {` `}
  </WithCustomTheme>
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

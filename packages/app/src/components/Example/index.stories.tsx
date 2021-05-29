import React from "react"

import { Meta, Story } from "@storybook/react"
import { ExamplePure, ExamplePureProps } from "."

const Template: Story<ExamplePureProps> = (args: ExamplePureProps) => (
  <ExamplePure {...args} />
)

export const ExamplePure1: Story<ExamplePureProps> = Template.bind({})

export default {
  title: `ExamplePure`,
  component: ExamplePure,
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

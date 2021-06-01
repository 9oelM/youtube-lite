import React from "react"

import { Meta, Story } from "@storybook/react"
import { NotFoundPageImpure, NotFoundPageImpureProps } from "."

const Template: Story<NotFoundPageImpureProps> = (
  args: NotFoundPageImpureProps
) => <NotFoundPageImpure {...args} />

export const NotFoundPageImpure1: Story<NotFoundPageImpureProps> =
  Template.bind({})
NotFoundPageImpure1.args = {
  color: `blue`,
}

export default {
  title: `NotFoundPage`,
  component: NotFoundPageImpure,
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

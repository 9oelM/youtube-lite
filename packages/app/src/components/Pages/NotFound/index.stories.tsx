import React from "react"

import { Meta, Story } from "@storybook/react"
import { NotFoundPagePure, NotFoundPagePureProps } from "."
import { noop } from "ts-essentials"
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<NotFoundPagePureProps> = (
  args: NotFoundPagePureProps
) => (
  <WithCustomTheme>
    <NotFoundPagePure {...args} />
  </WithCustomTheme>
)

export const NotFoundPageImpure1: Story<NotFoundPagePureProps> = Template.bind(
  {}
)
NotFoundPageImpure1.args = {
  onGoBackToMainPageClick: noop,
}

export default {
  title: `NotFoundPage`,
  component: NotFoundPagePure,
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

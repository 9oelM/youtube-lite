import React from "react"

import { Meta, Story } from "@storybook/react"
import { NotFoundPagePure, NotFoundPagePureProps } from "."
import { ThemeProvider } from "@xstyled/styled-components"
import { youtubeLiteTheme } from "src/styles/theme"
import { noop } from "ts-essentials"

const Template: Story<NotFoundPagePureProps> = (
  args: NotFoundPagePureProps
) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <NotFoundPagePure {...args} />
  </ThemeProvider>
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

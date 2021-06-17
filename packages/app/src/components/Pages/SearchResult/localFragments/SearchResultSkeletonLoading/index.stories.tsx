import React from "react"

import { Meta, Story } from "@storybook/react"
import {
  SearchResultSkeletonLoadingPure,
  SearchResultSkeletonLoadingPureProps,
} from "."
import { youtubeLiteTheme } from "src/styles/theme"
import { ThemeProvider } from "@xstyled/styled-components"

const Template: Story<SearchResultSkeletonLoadingPureProps> = (
  args: SearchResultSkeletonLoadingPureProps
) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <SearchResultSkeletonLoadingPure {...args} />
  </ThemeProvider>
)

export const Example: Story<SearchResultSkeletonLoadingPureProps> =
  Template.bind({})
Example.args = {}

export default {
  title: `SearchResultSkeletonLoading`,
  component: SearchResultSkeletonLoadingPure,
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

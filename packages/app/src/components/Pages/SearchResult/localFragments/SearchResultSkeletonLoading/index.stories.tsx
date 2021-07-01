import React from "react"

import { Meta, Story } from "@storybook/react"
import {
  SearchResultSkeletonLoadingPure,
  SearchResultSkeletonLoadingPureProps,
} from "."
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<SearchResultSkeletonLoadingPureProps> = (
  args: SearchResultSkeletonLoadingPureProps
) => (
  <WithCustomTheme>
    <SearchResultSkeletonLoadingPure {...args} />
  </WithCustomTheme>
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

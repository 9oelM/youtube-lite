/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"

import { Meta, Story } from "@storybook/react"
import { SearchResultCardPure, SearchResultCardPureProps } from "."
import { WithCustomTheme } from "src/utilities/storybook"
import { Mock } from "src/mock"
import { x } from "@xstyled/styled-components"
import { SF } from "src/styles/styleFragments"
import { decodeHtml } from "src/utilities/html"

const Template: Story<SearchResultCardPureProps> = (
  args: SearchResultCardPureProps
) => (
  <WithCustomTheme>
    <x.div {...SF.fullWH} {...SF.flexStyles} bg="true-gray-800">
      <SearchResultCardPure {...args} />
    </x.div>
  </WithCustomTheme>
)

export const Example: Story<SearchResultCardPureProps> = Template.bind({})
Example.args = {
  // @ts-ignore
  thumbnail: Mock.youtubeSearchResult.items[0]!.snippet.thumbnails.high.url,
  title: decodeHtml(Mock.youtubeSearchResult.items[0]!.snippet.title)!,
  description: decodeHtml(
    Mock.youtubeSearchResult.items[0]!.snippet.description
  )!,
}

export default {
  title: `SearchResultCard`,
  component: SearchResultCardPure,
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

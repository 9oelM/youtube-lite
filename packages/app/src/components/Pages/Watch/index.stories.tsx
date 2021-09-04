import React from "react"

import { Meta, Story } from "@storybook/react"
import { WatchPagePure, WatchPagePureProps } from "."
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<WatchPagePureProps> = (args: WatchPagePureProps) => (
  <WithCustomTheme>
    <WatchPagePure {...args} />
  </WithCustomTheme>
)

export const Example: Story<WatchPagePureProps> = Template.bind({})
Example.args = {
  videoId: `OFrtida1I8U`,
}

export default {
  title: `WatchPage`,
  component: WatchPagePure,
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

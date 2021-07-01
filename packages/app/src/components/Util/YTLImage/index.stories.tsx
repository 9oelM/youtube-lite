import React from "react"

import { Meta, Story } from "@storybook/react"
import { YTLImage, YTLImageProps } from "src/components/Util/YTLImage"
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<YTLImageProps> = (args: YTLImageProps) => (
  <WithCustomTheme>
    <YTLImage {...args} />
  </WithCustomTheme>
)

export const Example: Story<YTLImageProps> = Template.bind({})
Example.args = {
  src: `https://picsum.photos/seed/picsum/200/300`,
  width: `200px`,
  height: `300px`,
}

export default {
  title: `YTLImage`,
  component: YTLImage,
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

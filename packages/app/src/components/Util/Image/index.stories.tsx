import React from "react"

import { Meta, Story } from "@storybook/react"
import { youtubeLiteTheme } from "src/styles/theme"
import { ThemeProvider } from "@xstyled/styled-components"
import { YTLImage, YTLImageProps } from "src/components/Util/Image"

const Template: Story<YTLImageProps> = (args: YTLImageProps) => (
  <ThemeProvider theme={youtubeLiteTheme}>
    <YTLImage {...args} />
  </ThemeProvider>
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

import React from "react"

import { Meta, Story } from "@storybook/react"
import { SearchInputImpure, SearchInputImpureProps } from "."
import { x } from "@xstyled/styled-components"
import { SF } from "src/styles/styleFragments"
import { WithCustomTheme } from "src/utilities/storybook"

const Template: Story<SearchInputImpureProps> = (
  args: SearchInputImpureProps
) => (
  <WithCustomTheme>
    <x.div bg="background" {...SF.fullWH} {...SF.flexStyles}>
      <SearchInputImpure {...args} />
    </x.div>

    {` `}
  </WithCustomTheme>
)

export const Example: Story<SearchInputImpureProps> = Template.bind({})
Example.args = {}

export default {
  title: `SearchInput`,
  component: SearchInputImpure,
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

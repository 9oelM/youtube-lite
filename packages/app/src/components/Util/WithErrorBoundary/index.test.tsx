/* eslint-disable react/jsx-pascal-case */
import { mount, ReactWrapper } from "enzyme"
import React, { FC } from "react"
import { withErrorBoundary } from "."

describe(`WithErrorBoundary`, () => {
  const errorText = `error`
  const Fallback: FC = () => <div>{errorText}</div>

  it(`should render Fallback if component has an error`, () => {
    const WrappedWithErrorBoundary: FC = withErrorBoundary(() => {
      throw new Error(`test`)
    })(Fallback)

    const testComponent: ReactWrapper = mount(<WrappedWithErrorBoundary />)

    expect(testComponent.text()).toContain(errorText)
  })
  it(`should not render Fallback if component has no error`, () => {
    const ComponentWithoutError: FC = () => <div>test</div>
    const WrappedWithErrorBoundary: FC = withErrorBoundary(
      ComponentWithoutError
    )(Fallback)

    const testComponent: ReactWrapper = mount(<WrappedWithErrorBoundary />)

    expect(testComponent.text()).not.toContain(errorText)
    expect(testComponent.text()).toContain(`test`)
  })
})

import { mount } from "enzyme"
import React from "react"
import { FC } from "react"
import { useBoolean } from "src/hooks/useBoolean"

function prepareForTest(
  defaultValue = true
): [
  hookResult: { current: null | ReturnType<typeof useBoolean> },
  TestComponent: FC
] {
  const hookResult: { current: null | ReturnType<typeof useBoolean> } = {
    current: null,
  }
  const TestComponent: FC = () => {
    hookResult.current = useBoolean(defaultValue)

    return null
  }

  return [hookResult, TestComponent]
}

describe(`useBoolean`, () => {
  it.each([true, false])(
    `should initialize boolean with %p`,
    (defaultValue) => {
      const [hookResult, TestComponent] = prepareForTest(defaultValue)
      mount(<TestComponent />)
      if (!hookResult.current) {
        fail(`hookResult is null but it should have been initialized`)
      }
      expect(hookResult.current[0]).toBe(defaultValue)
    }
  )

  it(`should return setTrue, setFalse, and setter`, () => {
    const [hookResult, TestComponent] = prepareForTest()
    mount(<TestComponent />)
    if (!hookResult.current) {
      fail(`hookResult is null but it should have been initialized`)
    }
    hookResult.current.forEach((fn, idx) => {
      if (idx === 0) return
      expect(fn).toBeInstanceOf(Function)
    })
  })
})

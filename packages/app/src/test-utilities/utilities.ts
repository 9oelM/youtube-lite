import { mount } from "enzyme"

export function getByTestId<Component extends ReturnType<typeof mount>>(
  c: Component,
  testId: string
): ReturnType<ReturnType<typeof mount>[`find`]> {
  return c.find(`[data-testid="${testId}"]`)
}

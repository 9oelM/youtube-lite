import { mount } from "enzyme"
import _configureMockStore from "redux-mock-store"

export function getByTestId<Component extends ReturnType<typeof mount>>(
  c: Component,
  testId: string
): ReturnType<ReturnType<typeof mount>[`find`]> {
  return c.find(`[data-testid="${testId}"]`)
}

// just for the ease of auto import
export const configureMockStore = _configureMockStore

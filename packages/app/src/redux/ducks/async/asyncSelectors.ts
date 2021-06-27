import {
  createEarliestRequestByNameSelector,
  createLatestRequestByNameSelector,
} from "src/utilities/redux-async/asyncSelectors"

export const earliestRequestByNameSelector =
  createEarliestRequestByNameSelector()

export const latestRequestByNameSelector = createLatestRequestByNameSelector()

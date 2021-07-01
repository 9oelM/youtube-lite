import {
  createEarliestAsyncJobByNameSelector,
  createLatestAsyncJobByNameSelector,
} from "src/utilities/redux-async/asyncSelectors"

export const earliestAsyncJobByNameSelector =
  createEarliestAsyncJobByNameSelector()

export const latestAsyncJobByNameSelector = createLatestAsyncJobByNameSelector()

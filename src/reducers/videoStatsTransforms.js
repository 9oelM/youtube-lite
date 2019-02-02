import { createTransform } from "redux-persist"
import isMoreThanOneDay from "../modules/isMoreThanOneDay"
const { Timer } = require("easytimer.js")

const transforms = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {},
  // transform state being rehydrated
  (outboundState, key) => {
    const { startDate } = outboundState
    const transformed = isMoreThanOneDay(startDate)
      ? {
          timer: new Timer(),
          time: 0,
          videoCount: 0,
          startDate: new Date().toString(),
        }
      : {
          ...outboundState,
        }
    return transformed
  },
  { whitelist: [] }
)

export default transforms

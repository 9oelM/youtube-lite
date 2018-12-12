const humanize = require("humanize-duration")

const humanizeTime = timer => {
  const timeInMilliseconds = timer.getTimeValues().seconds * 1000
  const humanizedTime = humanize(timeInMilliseconds)
  return humanizedTime
}

export default humanizeTime

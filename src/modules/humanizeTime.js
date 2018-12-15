const humanize = require("humanize-duration")

const humanizeTime = time => {
  const timeInMilliseconds = time * 1000
  const humanizedTime = humanize(timeInMilliseconds)
  return humanizedTime
}

export default humanizeTime

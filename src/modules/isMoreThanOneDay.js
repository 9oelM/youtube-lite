// startDate is a stringified date thru toString
const isMoreThanOneDay = startDate => {
  const oneDayInMillisecs = 60 * 60 * 24 * 1000
  return (
    new Date().getTime() - new Date(startDate).getTime() > oneDayInMillisecs
  )
}

export default isMoreThanOneDay

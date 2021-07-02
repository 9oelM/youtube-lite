/* istanbul ignore file */
const YOUTUBE_API_KEY = (() => {
  if (!process.env[`DEPLOY_TARGET`]) {
    throw new Error(`process.env.DEPLOY_TARGET undefined`)
  }

  switch (process.env[`DEPLOY_TARGET`]) {
    // for local dev development
    case `DEV`:
      return `AIzaSyD2q5pHwhNyrjXRlzrJ7A8M17blcFt_UXI`
    // for deployed dev website
    case `DEPLOY_DEV`:
      return `AIzaSyA6gin34M0yCThGyx9K2Cqjpsibjrupj7A`
    // for production website
    case `PROD`:
      return `AIzaSyBS_mShhwnJf4T2C45rbsRLVIwT-vLJKHQ`
    default:
      throw new Error(`process.env.DEPLOY_TARGET undefined`)
  }
})()

const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search`
const YOUTUBE_SUGGESTION_URL = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q={}`

export const ENV = {
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_URL,
  YOUTUBE_SUGGESTION_URL,
}

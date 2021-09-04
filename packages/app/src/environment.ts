/* istanbul ignore file */
if (!process.env[`DEPLOY_TARGET`]) {
  throw new Error(`process.env.DEPLOY_TARGET undefined`)
}
if (!process.env[`YOUTUBE_API_KEY`]) {
  throw new Error(`YOUTUBE_API_KEY is undefined`)
}

const YOUTUBE_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search`
const YOUTUBE_SUGGESTION_URL = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q={}`

export const ENV = {
  YOUTUBE_API_KEY: process.env[`YOUTUBE_API_KEY`] as string,
  YOUTUBE_SEARCH_URL,
  YOUTUBE_SUGGESTION_URL,
}

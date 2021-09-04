/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const Enzyme = require(`enzyme`)
const Adapter = require(`enzyme-adapter-react-16`)

Enzyme.configure({ adapter: new Adapter() })
process.env.DEPLOY_TARGET = `DEV`
process.env.YOUTUBE_API_KEY = `DUMMY`

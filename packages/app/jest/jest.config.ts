import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: `..`,
  setupFiles: [`<rootDir>/jest/setupTest.js`],
  moduleNameMapper: {
    "src/(.*)": `<rootDir>/src/$1`,
    ".+\\.(css|styl|less|sass|scss|png|PNG|jpg|ttf|woff|woff2)$": `identity-obj-proxy`,
  },
  preset: `ts-jest`,
  testEnvironment: `jsdom`,
  collectCoverageFrom: [`src/**/*.{ts,tsx}`],
}
export default config

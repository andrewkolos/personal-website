import type { InitialOptionsTsJest } from 'ts-jest'
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config: InitialOptionsTsJest = {
  moduleNameMapper: {
    '/opt/(.*)': '<rootDir>/../../common/$1',
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules', '../../common', '.'],
  rootDir: '.',
}

export default config

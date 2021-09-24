// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,

  bail: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testTimeout: 10000,

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),

  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: ['**/*.spec.ts'],

  setupFiles: ['<rootDir>/jest.setup.ts'],
};

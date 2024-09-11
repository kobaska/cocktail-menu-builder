/* eslint-disable */
export default {
  displayName: 'adapters-controllers',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/adapters/controllers',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/jest.config.ts',
    '!**/index.ts',
  ],
  coverageReporters: [
    'lcov',
    [
      'text',
      {
        skipFull: false,
      },
    ],
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-reports',
        outputName: '/libs/adapters/controllers/jest.xml',
      },
    ],
  ],
};

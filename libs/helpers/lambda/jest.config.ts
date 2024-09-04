/* eslint-disable */
export default {
  displayName: 'helpers-lambda',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/helpers/lambda',
  collectCoverage: true,
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
        outputName: '/libs/helpers/lambda/jest.xml',
      },
    ],
  ],
};

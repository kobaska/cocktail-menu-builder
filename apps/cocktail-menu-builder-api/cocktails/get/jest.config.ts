/* eslint-disable */
export default {
  displayName: 'cocktail-menu-builder-api-cocktails-get',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/apps/cocktail-menu-builder-api/cocktails/get',
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
        outputName: '/apps/cocktail-menu-builder-api/cocktails/get/jest.xml',
      },
    ],
  ],
};

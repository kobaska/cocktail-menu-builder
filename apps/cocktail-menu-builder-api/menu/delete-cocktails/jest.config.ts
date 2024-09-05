/* eslint-disable */
export default {
  displayName: 'cocktail-menu-builder-api-menu-delete-cocktails',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/apps/cocktail-menu-builder-api/menu/delete-cocktails',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/jest.config.ts',
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
        outputName: '/apps/cocktail-menu-builder-api/menu/delete-cocktails/jest.xml',
      },
    ],
  ],
};

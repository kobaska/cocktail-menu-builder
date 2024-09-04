/* eslint-disable */
export default {
  displayName: 'cocktail-menu-builder-api-menu-post-cocktails',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/apps/cocktail-menu-builder-api/menu/post-cocktails',
};

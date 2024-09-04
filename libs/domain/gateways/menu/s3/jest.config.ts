/* eslint-disable */
export default {
  displayName: 'domain-gateways-menu-s3',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../../coverage/libs/domain/gateways/menu/s3',
};

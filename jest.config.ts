module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts'],
    rootDir: './',
    testMatch: ['<rootDir>/tests/*.spec.ts'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
  };



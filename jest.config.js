
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testMatch: [
      '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/fileMock.js',
      '\\.(gif|png|jpg|jpeg|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
      '^@/(.*)$': '<rootDir>/src/$1', 
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  
  };
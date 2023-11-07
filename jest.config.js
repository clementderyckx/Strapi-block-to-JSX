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
      // si vous utilisez des modules CSS ou d'autres importations de fichiers (par exemple, des images)
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(gif|png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };
  
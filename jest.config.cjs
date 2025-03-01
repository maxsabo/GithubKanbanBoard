module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/src/tests/test-utils.tsx"], // Виключаємо test-utils.tsx
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json",
        jsx: "react-jsx",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
module.exports = {
  testPathIgnorePatterns: ["./node_modules/"],
  transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "./node_modules/babel-jest",
      '.+\\.css$': 'jest-css-modules-transform'
  }
};

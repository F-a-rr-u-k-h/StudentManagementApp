module.exports = {
  preset: 'react-native',
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-gesture-handler|@react-navigation|react-native-reanimated|react-native-toast-message|@react-native-async-storage/async-storage|react-native-sqlite-storage)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};
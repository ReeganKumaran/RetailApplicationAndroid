// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',          // required for Expo Router
      'nativewind/babel',           // (optional) NativeWind — keep in the array, not nested
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};

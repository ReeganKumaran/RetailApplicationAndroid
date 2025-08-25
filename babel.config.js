// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",   // 👈 correct placement
      require.resolve("expo-router/babel"), // 👈 expo-router needs its own babel plugin
    ],
  };
};

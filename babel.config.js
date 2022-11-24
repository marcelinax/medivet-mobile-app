module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      'react-native-reanimated/plugin',
      [
        require.resolve('babel-plugin-module-resolver'), {
          root: ['./'],
          alias: {
            assets: './assets',
            themes: './themes',
            components: './components',
            screens: './screens',
          },
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ],
        },
      ],
    ],
  };
};

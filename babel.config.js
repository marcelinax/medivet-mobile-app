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
            components: './components',
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

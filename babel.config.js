module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@core': './src/core',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@types': './src/types',
          '@domains': './src/domains',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

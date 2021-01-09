module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          _components: './src/components',
          _constants: './src/constants',
          _atoms: './src/components/atoms',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _types: './src/types',
          _config: './src/config',
          _actions: './src/actions',
          _reducers: './src/reducers',
          _selectors: './src/selectors',
        },
      },
    ],
  ],
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './', // ✅ @ 를 프로젝트 루트로 인식
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

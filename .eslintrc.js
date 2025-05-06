// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  ignorePatterns: [
    '.expo/*',
    'dist/*',
    'android/*',
    'ios/*',
    'node_modules/*',
    'supabase/*',
    'utils/database.types.ts',
  ],
};

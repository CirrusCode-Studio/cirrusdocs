// // @ts-check
// import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs'],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       "@typescript-eslint/no-unsafe-assignment": "warn",
//       "prettier/prettier": ["error", { endOfLine: "auto" }],
//     },
//   },
// );

// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'dist/**',
      'node_modules/**',
    ],
  },

  // Base JS rules (bug-level, safe)
  eslint.configs.recommended,

  // ❗ DÙNG recommended, KHÔNG dùng recommendedTypeChecked
  ...tseslint.configs.recommended,

  // Prettier (format only)
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
    },
  },

  {
    rules: {
      /* ================================
       * TẮT NOISE (backend async / crypto)
       * ================================ */
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      /* ================================
       * GIỮ CẢNH BÁO CÓ GIÁ TRỊ
       * ================================ */
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-async-promise-executor': 'error',
      'no-throw-literal': 'error',

      /* ================================
       * FORMAT (prettier quyết định)
       * ================================ */
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);

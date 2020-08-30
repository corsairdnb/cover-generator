module.exports = {
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  overrides: [
    {
      files: ['*.css', '*.scss'],
      options: {
        singleQuote: false
      }
    },
    {
      files: ['.prettierrc', '.babelrc', '.eslintrc', '.stylelintrc'],
      options: {
        parser: 'json'
      }
    }
  ],
  quoteProps: 'preserve',
  trailingComma: 'none'
};

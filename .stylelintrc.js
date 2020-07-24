const patterns = {
  camelCase: /^[a-z][a-zA-Z0-9]+$/,
  pascalCase: /^[A-Z][a-zA-Z0-9]+$/,
  kebabCase: /^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*/, // might have leading underscore
  snakeCase: /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/,
  bemClass: /^([a-z\\-]{2,14})(__[a-z\\-]{2,12})?(--[a-z\\-]{2,12})?$/
};

module.exports = {
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-prettier'],

  rules: {
    'prettier/prettier': true,

    // Order
    'order/order': ['declarations', 'custom-properties', 'at-rules', 'rules'],
    'order/properties-alphabetical-order': true,

    // General / Sheet
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,

    'scss/at-import-no-partial-leading-underscore': true,

    // Declaration
    'declaration-no-important': true,

    // Declaration block
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'block-no-empty': true,

    // Selector
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: 'global'
      }
    ],
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'single',
    'scss/selector-no-redundant-nesting-selector': true,
    'selector-class-pattern': patterns.bemClass,
    'selector-max-id': 0,
    'selector-max-attribute': 0,
    'selector-max-class': 2,
    'selector-max-specificity': '0,4,0',
    'selector-max-universal': 0,
    'selector-max-pseudo-class': 1,

    // Media
    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-name-whitelist': '/^min-width/',

    // Variables
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': patterns.kebabCase,

    // At-rule
    'scss/at-rule-no-unknown': true,
    'at-rule-no-vendor-prefix': true,
    'at-rule-blacklist': ['extend', 'media'],

    // Properties
    'property-no-unknown': true,
    'shorthand-property-no-redundant-values': true,

    // Values
    'number-max-precision': 4,
    'value-no-vendor-prefix': true,
    'unit-no-unknown': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'length-zero-no-unit': true,

    // Colors
    'color-no-invalid-hex': true,
    'color-named': 'never',
    'color-hex-length': 'short',

    // Fonts
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',

    // Function
    'function-linear-gradient-no-nonstandard-direction': true,
    'scss/at-function-pattern': patterns.kebabCase,

    // Comment
    'comment-no-empty': true,

    // Operators
    'scss/operator-no-unspaced': true
  }
};

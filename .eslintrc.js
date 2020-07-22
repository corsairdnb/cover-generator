const pkg = require('./package');

const getReactVersion = () => {
  if (pkg.dependencies && pkg.dependencies.react) {
    return pkg.dependencies.react.replace(/[^0-9.]/g, '');
  }

  return null;
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    jest: true,

    // to prevent triggering no-undef
    // on Promise, Map, Set, etc.
    es6: true
  },

  globals: {},

  plugins: [
    'babel',
    'import',
    'react',
    'react-hooks',
    'jsx-a11y',
    'compat',
    'filenames',
    'jest',
    'more',
    'prettier',
    'promise',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react'
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },

  settings: {
    react: {
      version: getReactVersion()
    },
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'compat/compat': 'error',

    'prettier/prettier': 'error',

    // Best practices
    'no-restricted-syntax': ['error', 'ForInStatement', 'SequenceExpression'],
    'no-template-curly-in-string': 'error',
    'array-callback-return': 'error',
    'dot-notation': ['error', { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
    'no-caller': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    eqeqeq: ['error', 'always'],
    'no-lone-blocks': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-useless-call': 'error',
    yoda: 'error',
    'no-console': 'error',

    //Complexity
    complexity: ['error', 12],
    'max-params': ['error', 5],
    'max-depth': ['error', 3],
    'max-statements': ['error', 20],
    'max-nested-callbacks': ['error', 5],

    //react-hooks
    'react-hooks/rules-of-hooks': 'error',
    // Variables
    'no-shadow': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': ['error', { functions: false }],

    // Stylistic issues
    camelcase: 'error',
    'new-cap': ['error', { capIsNew: false }],
    'new-parens': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'one-var': ['error', 'never'],

    // ES6+
    'constructor-super': 'error',
    'no-this-before-super': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',

    // React
    'react/button-has-type': 'error',
    'react/display-name': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/forbid-component-props': ['error', { forbid: ['id'] }],
    'react/forbid-prop-types': ['error', { forbid: ['any', 'object', 'array'] }],
    'react/jsx-max-depth': ['error', { max: 8 }],
    'react/no-access-state-in-setstate': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-redundant-should-component-update': 'error',
    'react/no-typos': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-read-only-props': 'error',
    'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
    'react/prop-types': ['error', { ignore: ['children'] }],
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',

    // React-JSX
    'react/jsx-boolean-value': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': 'error',
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore'
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',

    // eslint-plugin-more
    'more/no-filter-instead-of-find': 'error',
    'more/no-void-map': 'error',

    // ES Modules
    'no-duplicate-imports': 'error',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/export': 'error',
    'import/no-mutable-exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-named-as-default-member': 'error',
    // 'import/no-default-export': 'error',
    'import/no-amd': 'error',
    'import/dynamic-import-chunkname': [
      'error',
      {
        webpackChunknameFormat: '[a-z-A-Z-]+'
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'index', 'parent', 'sibling']
        ]
      }
    ],

    // Babel Overrides to support modern features.
    // babel/quotes understands shorthand React.Fragment syntax
    // e.g. <></>
    'babel/quotes': ['error', 'single', { allowTemplateLiterals: true }],

    //Jest
    'jest/no-disabled-tests': 'error',
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'jest/prefer-spy-on': 'error',
    'jest/valid-describe': 'error',
    'jest/valid-expect': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-focused-tests': 'error',

    // Promise
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error'
  },

  overrides: [
    {
      files: ['*.test.js', '*.spec.js', '*.test.ts', '*.spec.ts', '*.e2e.ts'],
      rules: {
        'babel/quotes': 0,
        'max-nested-callbacks': ['error', 5],
        'max-statements': ['error', 60],
        'import/no-internal-modules': [0],
        'compat/compat': 0,
        'react/display-name': 0,
        'import/no-restricted-paths': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-handler-names': 0,
        'react/forbid-component-props': 0,
        'no-restricted-imports': 0,
        'promise/no-return-wrap': 0,
        'promise/param-names': 0,
        'promise/catch-or-return': 0
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json'
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint'
      ],
      rules: {
        'import/named': 0, // typescript validates it
        'react/prop-types': 0,
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};

module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'react-app',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'react/no-set-state': 'off',
        'max-lines-per-function': [1, 90],
        'import/prefer-default-export': 'off',
        'no-plusplus': 'off',
        'react/prop-types': 'off',
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'react/self-closing-comp': ['error', { 'component': true, 'html': true }],
        'arrow-body-style': ['error', 'as-needed']
    }
}

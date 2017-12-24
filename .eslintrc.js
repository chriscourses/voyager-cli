module.exports = {
    env: {
        browser: false,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        rules: {
            'no-console': 0
        }
    },
    globals: {
        module: true,
        require: true,
        __dirname: true,
        process: true
    }
}
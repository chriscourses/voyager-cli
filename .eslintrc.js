module.exports = {
    env: {
        browser: false,
        es6: false
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
        'no-console': 0
    },
    globals: {
        module: true,
        require: true,
        __dirname: true,
        process: true,
        console: true,
        describe: true,
        it: true,
        exports: true
    }
}

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // "eslint:recommended",
        "plugin:react/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: false,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "react/prop-types": "off",
        "react/jsx-no-duplicate-props": [1, { ignoreCase: false }],
    },
};

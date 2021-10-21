module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: "module", // Allows for the use of imports
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    env: {
        "browser": true,
        "es2021": true
    },
    settings: {
        react: {
          version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
      },
    extends: [
        "plugin:react/recommended",
        "standard",
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    rules: {
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-multi-spaces": ["error"]

    }
}

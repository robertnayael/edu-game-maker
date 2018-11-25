module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "setupTestFrameworkScriptFile": "<rootDir>/setupTests.js",
    "moduleNameMapper": {
        "\\.scss$": "identity-obj-proxy",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@components$": "<rootDir>/src/app/components"
    },
    "verbose": false
}

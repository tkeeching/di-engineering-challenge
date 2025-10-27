import type { Config } from "jest";

export default {
    // A preset that is used as a base for Jest's configuration
    preset: "ts-jest",

    // The test environment that will be used for testing
    testEnvironment: "node",

    // A map from regular expressions to paths to transformers
    transform: {
        "^.+\\.ts?$": ["ts-jest", { useESM: true }],
    },

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // An object that configures minimum threshold enforcement for coverage results
    coverageThreshold: {
        global: {
            lines: 80,
            statements: 80,
            functions: 80,
            branches: 80,
        },
    },

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
} satisfies Config;

const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
	},
	preset: 'ts-jest',
};

module.exports = createJestConfig(customJestConfig);
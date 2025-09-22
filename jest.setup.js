import '@testing-library/jest-dom';

jest.mock('next/image', () => (props) => {
	return <img {...props} />;
});
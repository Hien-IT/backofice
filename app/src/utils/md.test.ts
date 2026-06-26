// @vitest-environment jsdom
import { expect, test } from 'vitest';
import { md } from './md.js';

test.each([
	{ value: 'test', expected: '<p>test</p>\n' },
	{
		value: `[Backoffice](https://backoffice.io)`,
		expected: '<p><a target="_self" href="https://backoffice.io">Backoffice</a></p>\n',
	},
	{
		value: `[Backoffice](https://backoffice.io)`,
		expected: '<p><a target="_blank" href="https://backoffice.io" rel="noopener noreferrer">Backoffice</a></p>\n',
		options: { target: '_blank' } as const,
	},
	{ value: `test<script>alert('alert')</script>`, expected: '<p>test</p>\n' },
])('should sanitize "$str" into "$expected"', ({ value, expected, options }) => {
	expect(md(value, options)).toBe(expected);
});

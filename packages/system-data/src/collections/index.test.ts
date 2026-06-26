import { describe, expect, test } from 'vitest';
import { isSystemCollection, systemCollectionNames, systemCollectionRows } from './index.js';

describe('systemCollectionRows', () => {
	test('should be an array', () => {
		expect(Array.isArray(systemCollectionRows)).toBe(true);
	});

	test('should not be empty', () => {
		expect(systemCollectionRows.length).toBeGreaterThan(0);
	});

	test('should have system property set to true for all rows', () => {
		systemCollectionRows.forEach((row) => {
			expect(row.system).toBe(true);
		});
	});

	test('should have collection property for all rows', () => {
		systemCollectionRows.forEach((row) => {
			expect(row.collection).toBeDefined();
			expect(typeof row.collection).toBe('string');
		});
	});

	test('should allow data rows to override defaults', () => {
		// Find backoffice_settings which should have singleton: true (override from defaults)
		const settingsCollection = systemCollectionRows.find((row) => row.collection === 'backoffice_settings');

		if (settingsCollection) {
			expect(settingsCollection.singleton).toBe(true);
		}
	});

	test('should have all collections start with backoffice_', () => {
		systemCollectionRows.forEach((row) => {
			expect(row.collection?.startsWith('backoffice_')).toBe(true);
		});
	});

	test('should have unique collection names', () => {
		const collectionNames = systemCollectionRows.map((row) => row.collection);
		const uniqueNames = new Set(collectionNames);
		expect(collectionNames.length).toBe(uniqueNames.size);
	});
});

describe('systemCollectionNames', () => {
	test('should be an array of strings', () => {
		expect(Array.isArray(systemCollectionNames)).toBe(true);

		systemCollectionNames.forEach((name) => {
			expect(typeof name).toBe('string');
		});
	});

	test('should not be empty', () => {
		expect(systemCollectionNames.length).toBeGreaterThan(0);
	});

	test('should match the number of rows in systemCollectionRows', () => {
		expect(systemCollectionNames.length).toBe(systemCollectionRows.length);
	});
});

describe('isSystemCollection', () => {
	test('should return true for valid system collections', () => {
		expect(isSystemCollection('backoffice_users')).toBe(true);
		expect(isSystemCollection('backoffice_files')).toBe(true);
		expect(isSystemCollection('backoffice_collections')).toBe(true);
		expect(isSystemCollection('backoffice_fields')).toBe(true);
		expect(isSystemCollection('backoffice_activity')).toBe(true);
	});

	test('should return false for non-backoffice collections', () => {
		expect(isSystemCollection('users')).toBe(false);
		expect(isSystemCollection('articles')).toBe(false);
		expect(isSystemCollection('custom_table')).toBe(false);
		expect(isSystemCollection('my_collection')).toBe(false);
	});

	test('should return false for collections that start with backoffice_ but are not system collections', () => {
		expect(isSystemCollection('backoffice_custom')).toBe(false);
		expect(isSystemCollection('backoffice_my_table')).toBe(false);
		expect(isSystemCollection('backoffice_nonexistent_xyz_collection')).toBe(false);
	});

	test('should return false for empty strings', () => {
		expect(isSystemCollection('')).toBe(false);
	});

	test('should be case-sensitive', () => {
		expect(isSystemCollection('BACKOFFICE_USERS')).toBe(false);
		expect(isSystemCollection('Backoffice_Users')).toBe(false);
		expect(isSystemCollection('DirectUs_users')).toBe(false);
	});

	test('should return false for collection names that almost start with backoffice_', () => {
		expect(isSystemCollection('backoffice')).toBe(false);
		expect(isSystemCollection('directu_users')).toBe(false);
		expect(isSystemCollection('xbackoffice_users')).toBe(false);
		expect(isSystemCollection(' backoffice_users')).toBe(false);
		expect(isSystemCollection('backoffice_users ')).toBe(false);
	});

	test('should early return false when collection does not start with backoffice_', () => {
		// Test that the function correctly implements the early return optimization
		// by checking that non-backoffice_ collections always return false
		expect(isSystemCollection('my_collection')).toBe(false);
		expect(isSystemCollection('test')).toBe(false);
		expect(isSystemCollection('a')).toBe(false);
	});

	test('should return false for strings with backoffice_ in the middle', () => {
		expect(isSystemCollection('my_backoffice_collection')).toBe(false);
		expect(isSystemCollection('prefix_backoffice_users')).toBe(false);
	});

	test('should handle special characters', () => {
		expect(isSystemCollection('backoffice_')).toBe(false);
		expect(isSystemCollection('backoffice_\n')).toBe(false);
		expect(isSystemCollection('backoffice_\t')).toBe(false);
	});
});

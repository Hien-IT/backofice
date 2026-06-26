import { LocalType, Relation } from '@backoffice/types';
import { getRelation } from '@backoffice/utils';
import { useFieldsStore } from '@/stores/fields';
import { useRelationsStore } from '@/stores/relations';

export function getLocalTypeForField(collection: string, field: string): LocalType | null {
	const fieldsStore = useFieldsStore();
	const relationsStore = useRelationsStore();

	const fieldInfo = fieldsStore.getField(collection, field);
	const relations: Relation[] = relationsStore.getRelationsForField(collection, field);

	if (!fieldInfo) return null;

	if (relations.length === 0) {
		if (fieldInfo.type === 'alias') {
			if (fieldInfo.meta?.special?.includes('group')) {
				return 'group';
			}

			return 'presentation';
		}

		return 'standard';
	}

	if (relations.length === 1) {
		const relation = relations[0]!;
		if (relation.related_collection === 'backoffice_files' && relation.related_collection !== collection) return 'file';
		if (relation.collection === collection && relation.field === field) return 'm2o';
		return 'o2m';
	}

	if (relations.length === 2) {
		if ((fieldInfo.meta?.special || []).includes('translations')) {
			return 'translations';
		}

		if ((fieldInfo.meta?.special || []).includes('m2a')) {
			return 'm2a';
		}

		const relationForCurrent = getRelation(relations, collection, field);

		if (relationForCurrent?.collection === collection && relationForCurrent?.field === field) {
			return 'm2o';
		}

		const backofficeFilesRelationsCount = relations.filter(
			(relation) => relation.related_collection === 'backoffice_files',
		).length;

		const isRelationToBackofficeFiles = collection !== 'backoffice_files' && backofficeFilesRelationsCount === 1;
		const isSelfRelationToBackofficeFiles = backofficeFilesRelationsCount === 2;

		if (isRelationToBackofficeFiles || isSelfRelationToBackofficeFiles) {
			return 'files';
		} else {
			return 'm2m';
		}
	}

	return 'standard';
}

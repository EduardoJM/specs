import { SpecFile } from './types';

export function parseJson(obj: any) : SpecFile<'collection'> | SpecFile<'question'> | null {
    // TODO: schema validate OBJ in the future
    if (!obj || !obj.type) {
        return null;
    }
    if (obj.type === 'collection') {
        if (!obj.data) {
            return null;
        }
        return obj as SpecFile<'collection'>;
    }
    if (obj.type === 'question') {
        if (!obj.data) {
            return null;
        }
        return obj as SpecFile<'question'>;
    }
    return null;
}

import { ContentTypesMap } from './types';

export type ContentItemRenderer<K extends keyof ContentTypesMap> = (type: K, data: ContentTypesMap[K]) => string;

export interface ContentRenderer {
    getRenderer: <K extends keyof ContentTypesMap>(type: K) => ContentItemRenderer<K> | null;
}

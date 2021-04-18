
export type ContentPathType = 'relative' | 'absoluteUrl';

export interface ContentDataText {
    text: string;
}

export interface ContentDataImage {
    src: string;
    pathType?: ContentPathType;
    credits?: string;
}

export interface ContentTypesMap {
    'text': ContentDataText;
    'image': ContentDataImage;
}

export interface ContentTypedItem<K extends keyof ContentTypesMap> {
    type: K;
    data: ContentTypesMap[K];
}

export type SupportedContentItems =
    ContentTypedItem<'image'> |
    ContentTypedItem<'text'>;

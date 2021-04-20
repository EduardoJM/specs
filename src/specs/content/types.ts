
export type ContentPathType = 'relative' | 'absoluteUrl';

export interface ContentDataText {
    text: string;
}

export interface ContentDataImage {
    src: string;
    pathType?: ContentPathType;
}

export interface ContentDataList {
    listType?: 'unordered' | 'ordered';
    items: SupportedContentItems[];
}

export interface ContentDataTableCell {
    isHeader?: boolean;
    colspan?: number;
    rowspan?: number;
    content: ContentTypedItem<'image'> | ContentTypedItem<'list'> | ContentTypedItem<'text'> | ContentTypedItem<'credits'>;
}

export interface ContentDataTableRow {
    columns: ContentDataTableCell[];
}

export type ContentDataTable = ContentDataTableRow[];

export interface ContentDataCredits {
    text: string;
}

export interface ContentTypesMap {
    'text': ContentDataText;
    'image': ContentDataImage;
    'list': ContentDataList;
    'table': ContentDataTable;
    'credits': ContentDataCredits;
}

export interface ContentTypedItem<K extends keyof ContentTypesMap> {
    type: K;
    data: ContentTypesMap[K];
}

export type SupportedContentItems =
    ContentTypedItem<'image'> |
    ContentTypedItem<'text'> |
    ContentTypedItem<'list'> |
    ContentTypedItem<'table'> |
    ContentTypedItem<'credits'>;

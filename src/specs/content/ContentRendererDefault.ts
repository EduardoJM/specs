import {
    ContentTypesMap,
    ContentDataText,
    ContentDataImage,
    ContentPathType,
    ContentDataList,
    ContentDataTable,
    ContentDataCredits,
} from './types';
import { ContentItemRenderer, ContentRenderer } from './ContentRenderer';

export interface ContentRendererDefaultOptions {
    relativePath: string;
}

export default class ContentRendererDefault implements ContentRenderer {
    options: ContentRendererDefaultOptions;

    constructor(opts?: Partial<ContentRendererDefaultOptions>) {
        if (opts) {
            this.options = {
                relativePath: '',
                ...opts,
            };
        } else {
            this.options = {
                relativePath: '',
            };
        }
    }

    getRenderer<K extends keyof ContentTypesMap>(type: K): ContentItemRenderer<any> | null {
        if (type === 'text') {
            return this.renderText;
        } else if (type === 'image') {
            return this.renderImage;
        } else if (type === 'list') {
            return this.renderList;
        } else if (type === 'table') {
            return this.renderTable;
        } else if (type === 'credits') {
            return this.renderCredits;
        }
        return null;
    }

    renderCredits(type: 'credits', data: ContentDataCredits): string {
        return `<p class="credits">${data.text}</p>`;
    }

    renderTable(type: 'table', data: ContentDataTable): string {
        const rows = data.map((row) => {
            const cells = row.columns.map((cell) => {
                const renderer = this.getRenderer(cell.content.type);
                if (!renderer) {
                    throw new Error('invalid content type: ' + cell.content.type);
                }
                const content = renderer(cell.content.type, cell.content.data);
                const element = cell.isHeader ? 'th' : 'td';
                const colspan = cell.colspan !== undefined ? ` colspan="${cell.colspan}"` : '';
                const rowspan = cell.rowspan !== undefined ? ` rowspan="${cell.rowspan}"` : '';
                return `<${element}${colspan}${rowspan}>${content}</${element}>`;
            }).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `<table>${rows}</table>`;
    }

    renderList(type: 'list', data: ContentDataList): string {
        const element = data.listType == 'ordered' ? 'ol' : 'ul';
        const content = data.items.map((item) => {
            const renderer = this.getRenderer(item.type);
            if (!renderer) {
                throw new Error('invalid content type: ' + item.type);
            }
            return renderer(item.type, item.data);
        }).join('');
        return `<${element}>${content}</${element}>`;
    }

    renderText(type: 'text', data: ContentDataText): string {
        return `<p>${data.text}</p>`;
    }

    renderImage(type: 'image', data: ContentDataImage): string {
        const url = this.makeUrl(data.src, data.pathType);
        return `<img src="${url}" />`;
    }

    makeUrl(url: string, pathType?: ContentPathType): string {
        if (!pathType || pathType === 'relative') {
            return url;
        }
        return `${this.options.relativePath}${url}`;
    }
}

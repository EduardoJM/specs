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

    getRenderer<K extends keyof ContentTypesMap>(type: K): ContentItemRenderer<any> {
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
    }

    renderCredits(type: 'credits', data: ContentDataCredits): string {
        return `<p class="credits">${data.text}</p>`;
    }

    renderTable(type: 'table', data: ContentDataTable): string {
        const rows = data.map((row) => {
            const cells = row.columns.map((cell) => {
                const content = this.getRenderer(cell.content.type)(cell.content.type, cell.content.data);
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
        return `<${element}>${data.items.map((item) => this.getRenderer(item.type)(item.type, item.data)).join('')}</${element}>`;
    }

    renderText(type: 'text', data: ContentDataText): string {
        return `<p>${data.text}</p>`;
    }

    renderImage(type: 'image', data: ContentDataImage): string {
        const url = this.makeUrl(data.src, data.pathType);
        const img = `<img src="${url}" />`;
        if (data.credits) {
            return `
                <div class="image-container">
                    ${img}
                    <div class="image-credits">${data.credits}</div>
                </div>
            `;
        }
        return img;
    }

    makeUrl(url: string, pathType?: ContentPathType): string {
        if (!pathType || pathType === 'relative') {
            return url;
        }
        return `${this.options.relativePath}${url}`;
    }
}

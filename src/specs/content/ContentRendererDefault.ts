import {
    ContentTypesMap,
    ContentDataText,
    ContentDataImage,
    ContentPathType,
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
        } else if (type == 'image') {
            return this.renderImage;
        }
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

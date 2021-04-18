import { SupportedContentItems } from './types';
import { ContentRenderer } from './ContentRenderer';
import ContentRendererDefault, {
    ContentRendererDefaultOptions,
} from './ContentRendererDefault';

interface ContentOptions {
    defaultRenderOptions?: Partial<ContentRendererDefaultOptions>;
}

export default class Content {
    renderer: ContentRenderer;

    constructor(renderer?: ContentRenderer, opts?: ContentOptions) {
        if (!renderer) {
            this.renderer = new ContentRendererDefault(
                opts ? opts.defaultRenderOptions : undefined
            );
        } else {
            this.renderer = renderer;
        }
    }

    renderContentItem(item: SupportedContentItems) : string {
        if (item.type === 'image') {
            return '';
        } else if (item.type === 'text') {
            return '';
        }
    }
}

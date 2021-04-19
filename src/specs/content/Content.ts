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
        if (!this.renderer) {
            return '';
        }
        const renderer = this.renderer.getRenderer(item.type);
        if (!renderer) {
            return '';
        }
        return renderer(item.type, item.data);
    }
}

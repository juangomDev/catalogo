

// value object para representar una url

import { InvalidImageFormat } from "../exceptions/root.exceptions";  9 


export class Url {
    private readonly value: URL
    private readonly address: string

    constructor(url: URL) {
        this.value = url
        this.address = url.href
    }

    public getAddress(): string {
        return this.address
    }

    public getValue(): URL {
        return this.value
    }
}

export class ProductImageUrl extends Url {

    private static readonly IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'] as const

    private constructor(url: URL) {
        super(url);
    }

    public static create(url: URL): ProductImageUrl {
        const pathname = url.pathname.toLowerCase();

        if (!this.IMAGE_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
            throw new InvalidImageFormat('The image url must end with a valid image extension ' + this.IMAGE_EXTENSIONS.join(', '));
        }

        return new ProductImageUrl(url);
    }

    public getImageExtension(): string {
        const pathname = this.getValue().pathname.toLowerCase();
        for (const ext of ProductImageUrl.IMAGE_EXTENSIONS) {

            if (pathname.endsWith(ext)) return ext;

        }
        return '';
    }
}

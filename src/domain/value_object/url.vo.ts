

// value object para representar una url

export class ValidateUrl {
    static validateUrl(url: string): boolean {
        try {
            const parsedUrl = new URL(url);

            if (!parsedUrl.hostname || parsedUrl.protocol !== 'https:') return false;

            return true
        }catch {
            return false
        }
    }
}

export class Url {
    private readonly value: string

    constructor( url: string ) {
        this.value = url
    }

    static create( url: string ): Url {
        if ( !ValidateUrl.validateUrl(url) ){
            throw new Error('Invalid URL format')
        }

        return new Url(url)
    }
    
    public getValue(): string {
        return this.value
    }
}

export class ProductImageUrl extends Url {
    public static create(url: string): ProductImageUrl {
        const base = Url.create(url); 
        
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const pathname = new URL(base.getValue()).pathname.toLowerCase();
        
        if (!imageExtensions.some(ext => pathname.endsWith(ext))) {
            throw new Error('La URL de la imagen debe apuntar a un archivo de imagen válido.');
        }

        return new ProductImageUrl(base.getValue());
    }
}
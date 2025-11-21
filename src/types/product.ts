export interface Product {
	id: string;
	name: string;
	description: string;
	basePrice: number;
	images: string[];
	category: "clásica" | "decorativa" | "premium";
	sizes: ProductSize[];
	colors: ProductColor[];
	patterns: ProductPattern[];
	material: "algodón" | "nylon" | "mezcla";
	weightCapacity: string;
	weavingTechnique: string;
	availability: "en stock" | "bajo pedido" | "agotado";
	rating: number;
	reviewsCount: number;
	popularity: number;
	reviews?: Review[];
}

export interface Review {
	id: string;
	userName: string;
	rating: number;
	comment: string;
	date: string;
	verified: boolean;
	helpful?: number;
}

export interface ProductSize {
	id: string;
	name: string;
	dimensions: string;
	priceModifier: number;
}

export interface ProductColor {
	id: string;
	name: string;
	hex: string;
	priceModifier: number;
}

export interface ProductPattern {
	id: string;
	name: string;
	description: string;
	priceModifier: number;
}

export interface CartItem {
	product: Product;
	quantity: number;
	selectedSize: ProductSize;
	selectedColor: ProductColor;
	selectedPattern: ProductPattern;
	customizations?: {
		personalText?: string;
		specialInstructions?: string;
	};
}

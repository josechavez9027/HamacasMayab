import type { Product } from "../types/product";

export const products: Product[] = [
	{
		id: "1",
		name: "Hamaca Clásica Yucateca",
		description:
			"Hamaca tejida a mano con técnicas ancestrales mayas. Perfecta para relajarse en el jardín o terraza.",
		basePrice: 1200,
		category: "clásica",
		material: "algodón",
		weightCapacity: "160 kg",
		weavingTechnique: "Tradicional Maya",
		availability: "en stock",
		rating: 4.8,
		reviewsCount: 34,
		popularity: 95,
		images: [
			"https://images.unsplash.com/photo-1659619132788-2325bd7f87e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwaGFtbW9jayUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NTc0MjI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
			"https://images.unsplash.com/photo-1724390684296-10894afcdb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGhhbW1vY2slMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTU3NDIyODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		],
		sizes: [
			{
				id: "s1",
				name: "Individual",
				dimensions: "2.5m x 1.5m",
				priceModifier: 0,
			},
			{
				id: "s2",
				name: "Matrimonial",
				dimensions: "3m x 2m",
				priceModifier: 300,
			},
			{
				id: "s3",
				name: "Familiar",
				dimensions: "3.5m x 2.5m",
				priceModifier: 600,
			},
		],
		colors: [
			{
				id: "c1",
				name: "Rojo Maya",
				hex: "#D32F2F",
				priceModifier: 0,
			},
			{
				id: "c2",
				name: "Azul Caribe",
				hex: "#1976D2",
				priceModifier: 0,
			},
			{
				id: "c3",
				name: "Verde Selva",
				hex: "#388E3C",
				priceModifier: 0,
			},
			{
				id: "c4",
				name: "Amarillo Sol",
				hex: "#F57C00",
				priceModifier: 50,
			},
			{
				id: "c5",
				name: "Multicolor",
				hex: "#E91E63",
				priceModifier: 100,
			},
		],
		patterns: [
			{
				id: "p1",
				name: "Clásico",
				description: "Tejido tradicional liso",
				priceModifier: 0,
			},
			{
				id: "p2",
				name: "Rayas",
				description: "Patrón de rayas coloridas",
				priceModifier: 150,
			},
			{
				id: "p3",
				name: "Geométrico Maya",
				description: "Diseños inspirados en arte maya",
				priceModifier: 300,
			},
		],
	},
	{
		id: "2",
		name: "Hamaca Moderna Decorativa",
		description:
			"Hamaca con diseño contemporáneo, materiales premium y acabados modernos para máximo confort.",
		basePrice: 1800,
		category: "decorativa",
		material: "nylon",
		weightCapacity: "180 kg",
		weavingTechnique: "Moderno Intenso",
		availability: "en stock",
		rating: 4.6,
		reviewsCount: 28,
		popularity: 85,
		images: [
			"https://images.unsplash.com/photo-1678791580150-bd68bb640f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tb2NrJTIwYmVhY2glMjB0cm9waWNhbHxlbnwxfHx8fDE3NTU3NDIyODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
			"https://images.unsplash.com/photo-1724390684296-10894afcdb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGhhbW1vY2slMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTU3NDIyODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		],
		sizes: [
			{
				id: "s1",
				name: "Individual",
				dimensions: "2.5m x 1.5m",
				priceModifier: 0,
			},
			{
				id: "s2",
				name: "Matrimonial",
				dimensions: "3m x 2m",
				priceModifier: 400,
			},
			{
				id: "s3",
				name: "Familiar",
				dimensions: "3.5m x 2.5m",
				priceModifier: 800,
			},
		],
		colors: [
			{
				id: "c1",
				name: "Blanco Nube",
				hex: "#FFFFFF",
				priceModifier: 0,
			},
			{
				id: "c2",
				name: "Gris Moderno",
				hex: "#757575",
				priceModifier: 0,
			},
			{
				id: "c3",
				name: "Azul Océano",
				hex: "#0277BD",
				priceModifier: 100,
			},
			{
				id: "c4",
				name: "Verde Menta",
				hex: "#26A69A",
				priceModifier: 100,
			},
		],
		patterns: [
			{
				id: "p1",
				name: "Minimalista",
				description: "Diseño limpio y moderno",
				priceModifier: 0,
			},
			{
				id: "p2",
				name: "Textured",
				description: "Acabado con textura especial",
				priceModifier: 200,
			},
			{
				id: "p3",
				name: "Premium Weave",
				description: "Tejido premium de alta calidad",
				priceModifier: 500,
			},
		],
	},
	{
		id: "3",
		name: "Hamaca Premium Artesanal",
		description:
			"La mejor calidad disponible. Hamaca de lujo tejida por maestros artesanos con materiales premium.",
		basePrice: 2800,
		category: "premium",
		material: "mezcla",
		weightCapacity: "200 kg",
		weavingTechnique: "Artesanal Premium",
		availability: "bajo pedido",
		rating: 4.9,
		reviewsCount: 42,
		popularity: 92,
		images: [
			"https://images.unsplash.com/photo-1659619132788-2325bd7f87e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwaGFtbW9jayUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NTc0MjI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
			"https://images.unsplash.com/photo-1678791580150-bd68bb640f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tb2NrJTIwYmVhY2glMjB0cm9waWNhbHxlbnwxfHx8fDE3NTU3NDIyODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		],
		sizes: [
			{
				id: "s1",
				name: "Individual",
				dimensions: "2.5m x 1.5m",
				priceModifier: 0,
			},
			{
				id: "s2",
				name: "Matrimonial",
				dimensions: "3m x 2m",
				priceModifier: 500,
			},
			{
				id: "s3",
				name: "Familiar",
				dimensions: "3.5m x 2.5m",
				priceModifier: 1000,
			},
			{
				id: "s4",
				name: "Extra Grande",
				dimensions: "4m x 3m",
				priceModifier: 1500,
			},
		],
		colors: [
			{
				id: "c1",
				name: "Oro Maya",
				hex: "#FFD700",
				priceModifier: 200,
			},
			{
				id: "c2",
				name: "Plata Lunar",
				hex: "#C0C0C0",
				priceModifier: 150,
			},
			{
				id: "c3",
				name: "Rojo Imperial",
				hex: "#B71C1C",
				priceModifier: 100,
			},
			{
				id: "c4",
				name: "Azul Real",
				hex: "#1A237E",
				priceModifier: 100,
			},
			{
				id: "c5",
				name: "Arcoíris Premium",
				hex: "#E91E63",
				priceModifier: 300,
			},
		],
		patterns: [
			{
				id: "p1",
				name: "Artesanal Clásico",
				description: "Tejido tradicional de lujo",
				priceModifier: 0,
			},
			{
				id: "p2",
				name: "Diseño Exclusivo",
				description: "Patrón único creado por artistas",
				priceModifier: 400,
			},
			{
				id: "p3",
				name: "Edición Especial",
				description: "Diseño limitado con bordados",
				priceModifier: 800,
			},
		],
	},
];

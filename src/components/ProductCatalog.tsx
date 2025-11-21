import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Product } from "../types/product";
import { products } from "../data/products";

interface ProductCatalogProps {
	onAddToCart: (product: Product) => void;
	onViewProduct: (product: Product) => void;
}

export function ProductCatalog({
	onAddToCart,
	onViewProduct,
}: ProductCatalogProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const categories = [
		{ id: "all", name: "Todas", count: products.length },
		{
			id: "clásica",
			name: "Clásica",
			count: products.filter((p) => p.category === "clásica").length,
		},
		{
			id: "decorativa",
			name: "Decorativa",
			count: products.filter((p) => p.category === "decorativa").length,
		},
		{
			id: "premium",
			name: "Premium",
			count: products.filter((p) => p.category === "premium").length,
		},
	];

	const filteredProducts =
		selectedCategory === "all"
			? products
			: products.filter((product) => product.category === selectedCategory);

	return (
		<section id="productos" className="py-16 bg-muted/30 bg-white">
			<div className="container mx-auto px-4 bg-white text-black">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold mb-4">Nuestras Hamacas</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Cada hamaca es única, tejida a mano por artesanos yucatecos con
						técnicas ancestrales y materiales de la más alta calidad.
					</p>

					<p
						className="text-muted-foreground max-w-2xl mx-auto"
						style={{ marginTop: "10px" }}
					>
						El estado de Yucatán se caracteriza por su gran riqueza cultural,
						histórica y artesanal, siendo las hamacas uno de los símbolos más
						representativos de la tradición maya al cumplir con una función
						práctica como objetos de descanso y sueño, como parte de la
						identidad cultural de las familias yucatecas, quienes han heredado
						de generación en generación la técnica del tejido. Su elaboración es
						una actividad artesanal que requiere tiempo, destreza y creatividad,
						lo que convierte a cada hamaca en un producto único.
					</p>
				</div>

				{/* Category Filter */}
				<div className="flex flex-wrap justify-center gap-3 mb-8">
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={selectedCategory === category.id ? "default" : "outline"}
							onClick={() => setSelectedCategory(category.id)}
							className="flex items-center gap-2"
						>
							{category.name}
							<Badge variant="secondary" className="ml-1">
								{category.count}
							</Badge>
						</Button>
					))}
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
					{filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={onAddToCart}
							onViewDetails={onViewProduct}
						/>
					))}
				</div>

				{filteredProducts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-muted-foreground">
							No se encontraron productos en esta categoría.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}

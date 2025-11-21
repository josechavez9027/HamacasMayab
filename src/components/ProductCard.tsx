import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "../types/product";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
	onViewDetails: (product: Product) => void;
}

export function ProductCard({
	product,
	onAddToCart,
	onViewDetails,
}: ProductCardProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "Clásica":
				return "bg-green-100 text-green-800";
			case "decorativa":
				return "bg-blue-100 text-blue-800";
			case "premium":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
		}).format(price);
	};

	return (
		<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="p-0">
				<div className="relative aspect-square overflow-hidden">
					<ImageWithFallback
						src={product.images[currentImageIndex]}
						alt={product.name}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
						onClick={() => onViewDetails(product)}
					/>
					<Badge
						className={`absolute top-2 left-2 ${getCategoryColor(
							product.category
						)}`}
					>
						{product.category}
					</Badge>
					{product.images.length > 1 && (
						<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
							{product.images.map((_, index) => (
								<button
									key={index}
									className={`w-2 h-2 rounded-full ${
										index === currentImageIndex ? "bg-white" : "bg-white/50"
									}`}
									onClick={(e) => {
										e.stopPropagation();
										setCurrentImageIndex(index);
									}}
								/>
							))}
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="p-4">
				<CardTitle
					className="mb-2 cursor-pointer hover:text-primary"
					onClick={() => onViewDetails(product)}
				>
					{product.name}
				</CardTitle>
				<p className="text-muted-foreground text-sm mb-3 line-clamp-2">
					{product.description}
				</p>
				<div className="flex justify-between items-center">
					<span className="font-bold text-lg text-primary">
						Desde {formatPrice(product.basePrice)}
					</span>
					<span className="text-sm text-muted-foreground">
						{product.colors.length} colores
					</span>
				</div>
			</CardContent>

			<CardFooter className="p-4 pt-0 flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onViewDetails(product)}
					className="flex-1"
				>
					Ver Detalles
				</Button>
				<Button
					size="sm"
					onClick={() => onAddToCart(product)}
					className="flex-1 bg-orange-600 hover:bg-orange-700"
				>
					Agregar al Carrito
				</Button>
			</CardFooter>
		</Card>
	);
}

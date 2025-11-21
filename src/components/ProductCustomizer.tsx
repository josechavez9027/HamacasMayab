import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import type {
	Product,
	ProductSize,
	ProductColor,
	ProductPattern,
} from "../types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCustomizerProps {
	product: Product | null;
	isOpen: boolean;
	onClose: () => void;
	onAddToCart: (
		product: Product,
		selectedSize: ProductSize,
		selectedColor: ProductColor,
		selectedPattern: ProductPattern,
		quantity: number,
		customizations?: any
	) => void;
}

export function ProductCustomizer({
	product,
	isOpen,
	onClose,
	onAddToCart,
}: ProductCustomizerProps) {
	const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
	const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
	const [selectedPattern, setSelectedPattern] = useState<ProductPattern | null>(
		null
	);
	const [quantity, setQuantity] = useState(1);
	const [personalText, setPersonalText] = useState("");
	const [specialInstructions, setSpecialInstructions] = useState("");
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	if (!isOpen || !product) return null;

	// Initialize defaults when product changes
	useState(() => {
		if (product) {
			setSelectedSize(product.sizes[0]);
			setSelectedColor(product.colors[0]);
			setSelectedPattern(product.patterns[0]);
			setCurrentImageIndex(0);
		}
	});

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
		}).format(price);
	};

	const calculateTotal = () => {
		if (!selectedSize || !selectedColor || !selectedPattern)
			return product.basePrice;

		return (
			(product.basePrice +
				selectedSize.priceModifier +
				selectedColor.priceModifier +
				selectedPattern.priceModifier) *
			quantity
		);
	};

	const handleAddToCart = () => {
		if (!selectedSize || !selectedColor || !selectedPattern) return;

		onAddToCart(
			product,
			selectedSize,
			selectedColor,
			selectedPattern,
			quantity,
			{
				personalText: personalText.trim() || undefined,
				specialInstructions: specialInstructions.trim() || undefined,
			}
		);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
			<div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg">
				<Card className="border-0">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>{product.name}</CardTitle>
						<Button variant="ghost" size="sm" onClick={onClose}>
							<X className="h-4 w-4" />
						</Button>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Product Images */}
							<div className="space-y-4">
								<div className="aspect-square overflow-hidden rounded-lg">
									<ImageWithFallback
										src={product.images[currentImageIndex]}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								</div>
								{product.images.length > 1 && (
									<div className="flex gap-2">
										{product.images.map((image, index) => (
											<button
												key={index}
												className={`flex-1 aspect-square overflow-hidden rounded border-2 ${
													index === currentImageIndex
														? "border-primary"
														: "border-transparent"
												}`}
												onClick={() => setCurrentImageIndex(index)}
											>
												<ImageWithFallback
													src={image}
													alt={`${product.name} ${index + 1}`}
													className="w-full h-full object-cover"
												/>
											</button>
										))}
									</div>
								)}
							</div>

							{/* Customization Options */}
							<div className="space-y-6">
								<div>
									<p className="text-muted-foreground mb-4">
										{product.description}
									</p>
									<Badge className="bg-green-100 text-green-800 mb-4">
										{product.category}
									</Badge>
								</div>

								{/* Size Selection */}
								<div>
									<Label className="text-base font-medium mb-3 block">
										Tamaño
									</Label>
									<RadioGroup
										value={selectedSize?.id}
										onValueChange={(value) => {
											const size = product.sizes.find((s) => s.id === value);
											if (size) setSelectedSize(size);
										}}
										className="space-y-2"
									>
										{product.sizes.map((size) => (
											<div
												key={size.id}
												className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50"
											>
												<RadioGroupItem value={size.id} id={size.id} />
												<Label
													htmlFor={size.id}
													className="flex-1 cursor-pointer"
												>
													<div className="flex justify-between items-center">
														<div>
															<span className="font-medium">{size.name}</span>
															<span className="text-sm text-muted-foreground ml-2">
																({size.dimensions})
															</span>
														</div>
														{size.priceModifier > 0 && (
															<span className="text-sm text-green-600">
																+{formatPrice(size.priceModifier)}
															</span>
														)}
													</div>
												</Label>
											</div>
										))}
									</RadioGroup>
								</div>

								{/* Color Selection */}
								<div>
									<Label className="text-base font-medium mb-3 block">
										Color
									</Label>
									<div className="grid grid-cols-2 gap-2">
										{product.colors.map((color) => (
											<button
												key={color.id}
												className={`p-3 border rounded-lg hover:bg-muted/50 flex items-center gap-3 ${
													selectedColor?.id === color.id
														? "border-primary bg-primary/5"
														: ""
												}`}
												onClick={() => setSelectedColor(color)}
											>
												<span
													className="w-5 h-5 rounded-full border"
													style={{ backgroundColor: color.hex }}
												/>
												<div className="flex-1 text-left">
													<div className="font-medium text-sm">
														{color.name}
													</div>
													{color.priceModifier > 0 && (
														<div className="text-xs text-green-600">
															+{formatPrice(color.priceModifier)}
														</div>
													)}
												</div>
											</button>
										))}
									</div>
								</div>

								{/* Pattern Selection */}
								<div>
									<Label className="text-base font-medium mb-3 block">
										Patrón
									</Label>
									<RadioGroup
										value={selectedPattern?.id}
										onValueChange={(value) => {
											const pattern = product.patterns.find(
												(p) => p.id === value
											);
											if (pattern) setSelectedPattern(pattern);
										}}
										className="space-y-2"
									>
										{product.patterns.map((pattern) => (
											<div
												key={pattern.id}
												className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50"
											>
												<RadioGroupItem value={pattern.id} id={pattern.id} />
												<Label
													htmlFor={pattern.id}
													className="flex-1 cursor-pointer"
												>
													<div className="flex justify-between items-center">
														<div>
															<span className="font-medium">
																{pattern.name}
															</span>
															<p className="text-sm text-muted-foreground">
																{pattern.description}
															</p>
														</div>
														{pattern.priceModifier > 0 && (
															<span className="text-sm text-green-600">
																+{formatPrice(pattern.priceModifier)}
															</span>
														)}
													</div>
												</Label>
											</div>
										))}
									</RadioGroup>
								</div>

								{/* Quantity */}
								<div>
									<Label className="text-base font-medium mb-2 block">
										Cantidad
									</Label>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => setQuantity(Math.max(1, quantity - 1))}
										>
											-
										</Button>
										<Input
											type="number"
											value={quantity}
											onChange={(e) =>
												setQuantity(Math.max(1, parseInt(e.target.value) || 1))
											}
											className="w-20 text-center"
											min="1"
										/>
										<Button
											variant="outline"
											size="sm"
											onClick={() => setQuantity(quantity + 1)}
										>
											+
										</Button>
									</div>
								</div>

								{/* Customizations */}
								<div className="space-y-4">
									<div>
										<Label
											htmlFor="personalText"
											className="text-base font-medium mb-2 block"
										>
											Texto Personalizado (Opcional)
										</Label>
										<Input
											id="personalText"
											value={personalText}
											onChange={(e) => setPersonalText(e.target.value)}
											placeholder="Ej: Familia García, ¡Buen Descanso!"
											maxLength={50}
										/>
										<p className="text-xs text-muted-foreground mt-1">
											{personalText.length}/50 caracteres
										</p>
									</div>

									<div>
										<Label
											htmlFor="specialInstructions"
											className="text-base font-medium mb-2 block"
										>
											Instrucciones Especiales (Opcional)
										</Label>
										<Textarea
											id="specialInstructions"
											value={specialInstructions}
											onChange={(e) => setSpecialInstructions(e.target.value)}
											placeholder="Cualquier solicitud especial para tu hamaca..."
											rows={3}
											maxLength={200}
										/>
										<p className="text-xs text-muted-foreground mt-1">
											{specialInstructions.length}/200 caracteres
										</p>
									</div>
								</div>

								{/* Price and Add to Cart */}
								<div className="border-t pt-4">
									<div className="flex justify-between items-center mb-4">
										<span className="text-lg">Total:</span>
										<span className="text-2xl font-bold text-primary">
											{formatPrice(calculateTotal())}
										</span>
									</div>
									<Button
										onClick={handleAddToCart}
										className="w-full bg-orange-600 hover:bg-orange-700"
										size="lg"
										disabled={
											!selectedSize || !selectedColor || !selectedPattern
										}
									>
										<ShoppingCart className="h-4 w-4 mr-2" />
										Agregar al Carrito
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

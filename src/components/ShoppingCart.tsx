import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import type { CartItem } from "../types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ShoppingCartProps {
	isOpen: boolean;
	onClose: () => void;
	cartItems: CartItem[];
	onUpdateQuantity: (itemIndex: number, newQuantity: number) => void;
	onRemoveItem: (itemIndex: number) => void;
}

export function ShoppingCart({
	isOpen,
	onClose,
	cartItems,
	onUpdateQuantity,
	onRemoveItem,
}: ShoppingCartProps) {
	if (!isOpen) return null;

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
		}).format(price);
	};

	const calculateItemTotal = (item: CartItem) => {
		const total =
			(item.product.basePrice +
				item.selectedSize.priceModifier +
				item.selectedColor.priceModifier +
				item.selectedPattern.priceModifier) *
			item.quantity;
		return total;
	};

	const calculateTotal = () => {
		return cartItems.reduce(
			(total, item) => total + calculateItemTotal(item),
			0
		);
	};

	const totalItems = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
			<div className="w-full max-w-md bg-white h-full overflow-y-auto">
				<Card className="h-full rounded-none border-l">
					<CardHeader className="flex flex-row items-center justify-between pb-4">
						<CardTitle className="flex items-center gap-2">
							🛒 Carrito
							<Badge variant="secondary">{totalItems}</Badge>
						</CardTitle>
						<Button variant="ghost" size="sm" onClick={onClose}>
							<X className="h-4 w-4" />
						</Button>
					</CardHeader>

					<CardContent className="space-y-4">
						{cartItems.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-muted-foreground mb-4">
									Tu carrito está vacío
								</p>
								<Button onClick={onClose}>Continuar Comprando</Button>
							</div>
						) : (
							<>
								{/* Cart Items */}
								<div className="space-y-4">
									{cartItems.map((item, index) => (
										<div key={index} className="border rounded-lg p-4">
											<div className="flex gap-3">
												<ImageWithFallback
													src={item.product.images[0]}
													alt={item.product.name}
													className="w-16 h-16 object-cover rounded"
												/>
												<div className="flex-1 min-w-0">
													<h4 className="font-medium text-sm truncate">
														{item.product.name}
													</h4>
													<div className="text-xs text-muted-foreground space-y-1 mt-1">
														<p>Tamaño: {item.selectedSize.name}</p>
														<p className="flex items-center gap-1">
															Color:
															<span
																className="w-3 h-3 rounded-full border"
																style={{
																	backgroundColor: item.selectedColor.hex,
																}}
															/>
															{item.selectedColor.name}
														</p>
														<p>Patrón: {item.selectedPattern.name}</p>
													</div>
													<div className="flex items-center justify-between mt-2">
														<span className="font-medium text-sm">
															{formatPrice(calculateItemTotal(item))}
														</span>
														<div className="flex items-center gap-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	onUpdateQuantity(
																		index,
																		Math.max(0, item.quantity - 1)
																	)
																}
																className="h-6 w-6 p-0"
															>
																<Minus className="h-3 w-3" />
															</Button>
															<span className="text-sm w-8 text-center">
																{item.quantity}
															</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	onUpdateQuantity(index, item.quantity + 1)
																}
																className="h-6 w-6 p-0"
															>
																<Plus className="h-3 w-3" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																onClick={() => onRemoveItem(index)}
																className="h-6 w-6 p-0 text-destructive hover:text-destructive"
															>
																<Trash2 className="h-3 w-3" />
															</Button>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

								<Separator />

								{/* Total */}
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Subtotal:</span>
										<span>{formatPrice(calculateTotal())}</span>
									</div>
									<div className="flex justify-between">
										<span>Envío:</span>
										<span className="text-green-600">Gratis</span>
									</div>
									<Separator />
									<div className="flex justify-between font-bold text-lg">
										<span>Total:</span>
										<span>{formatPrice(calculateTotal())}</span>
									</div>
								</div>

								{/* Actions */}
								<div className="space-y-2 pt-4">
									<Button
										className="w-full bg-orange-600 hover:bg-orange-700"
										size="lg"
									>
										Proceder al Pago
									</Button>
									<Button
										variant="outline"
										className="w-full"
										onClick={onClose}
									>
										Continuar Comprando
									</Button>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

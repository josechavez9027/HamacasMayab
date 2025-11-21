import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
	Star,
	ShoppingCart,
	Package,
	Ruler,
	Palette,
	Grid3x3,
	ThumbsUp,
	CheckCircle2,
	AlertCircle,
} from "lucide-react";
import type { Product, Review } from "../types/product";
import { toast } from "sonner";

interface ProductDetailsModalProps {
	product: Product | null;
	isOpen: boolean;
	onClose: () => void;
	onAddToCart?: (product: Product) => void;
	onCustomize?: (product: Product) => void;
}

export function ProductDetailsModal({
	product,
	isOpen,
	onClose,
	onAddToCart,
	onCustomize,
}: ProductDetailsModalProps) {
	const [newReview, setNewReview] = useState({
		userName: "",
		rating: 5,
		comment: "",
	});

	const [reviews, setReviews] = useState<Review[]>([]);
	const [errors, setErrors] = useState({
		userName: "",
		comment: "",
	});

	// Actualizar reseñas cuando cambia el producto
	useEffect(() => {
		if (product) {
			setReviews(product.reviews || []);
		}
	}, [product]);

	const handleSubmitReview = (e: React.FormEvent) => {
		e.preventDefault();

		// Validación
		const newErrors = { userName: "", comment: "" };
		let isValid = true;

		if (!newReview.userName.trim()) {
			newErrors.userName = "El nombre es requerido";
			isValid = false;
		}

		if (!newReview.comment.trim()) {
			newErrors.comment = "El comentario es requerido";
			isValid = false;
		} else if (newReview.comment.trim().length < 10) {
			newErrors.comment = "El comentario debe tener al menos 10 caracteres";
			isValid = false;
		}

		setErrors(newErrors);

		if (!isValid) {
			toast.error("Por favor, completa todos los campos", {
				icon: <AlertCircle className="h-5 w-5" />,
			});
			return;
		}

		// Crear nueva reseña
		const review: Review = {
			id: Date.now().toString(),
			userName: newReview.userName,
			rating: newReview.rating,
			comment: newReview.comment,
			date: new Date().toLocaleDateString("es-MX", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			verified: false,
			helpful: 0,
		};

		setReviews([review, ...reviews]);

		toast.success("¡Reseña publicada exitosamente!", {
			description: "Gracias por compartir tu opinión",
			icon: <CheckCircle2 className="h-5 w-5" />,
		});

		// Limpiar formulario
		setNewReview({
			userName: "",
			rating: 5,
			comment: "",
		});
		setErrors({ userName: "", comment: "" });
	};

	const handleHelpful = (reviewId: string) => {
		setReviews(
			reviews.map((review) =>
				review.id === reviewId
					? { ...review, helpful: (review.helpful || 0) + 1 }
					: review
			)
		);
		toast.success("Gracias por tu feedback");
	};

	const averageRating =
		reviews.length > 0
			? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
			: product?.rating || 0;

	const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: reviews.filter((r) => r.rating === star).length,
		percentage:
			reviews.length > 0
				? (reviews.filter((r) => r.rating === star).length / reviews.length) *
				  100
				: 0,
	}));

	// Si no hay producto, no renderizar nada
	if (!product) {
		return null;
	}

	// Usar valores por defecto para evitar undefined
	const productImages = product.images || [];
	const productColors = product.colors || [];
	const productPatterns = product.patterns || [];

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl">{product.name}</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						{product.description}
					</DialogDescription>
				</DialogHeader>

				<div className="grid md:grid-cols-2 gap-8 mt-4">
					{/* Imagen del producto */}
					<div className="space-y-4">
						<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
							<img
								src={productImages[0]}
								alt={product.name}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Imágenes adicionales */}
						{productImages.length > 1 && (
							<div className="grid grid-cols-4 gap-2">
								{productImages.slice(1, 5).map((image, index) => (
									<div
										key={index}
										className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
									>
										<img
											src={image}
											alt={`${product.name} - vista ${index + 2}`}
											className="w-full h-full object-cover"
										/>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Información del producto */}
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Badge variant="secondary">{product.category}</Badge>
								<Badge
									variant={
										product.availability === "en stock" ? "default" : "outline"
									}
								>
									{product.availability}
								</Badge>
							</div>

							<div className="flex items-center gap-2 mb-4">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${
												i < Math.floor(averageRating)
													? "fill-yellow-400 text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-muted-foreground">
									{averageRating.toFixed(1)} ({reviews.length} reseñas)
								</span>
							</div>

							<p className="text-3xl mb-4">
								${product.basePrice.toLocaleString("es-MX")}
							</p>

							<p className="text-muted-foreground leading-relaxed">
								{product.description}
							</p>
						</div>

						<Separator />

						{/* Especificaciones */}
						<div className="space-y-3">
							<h3 className="font-semibold">Especificaciones</h3>

							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-start gap-2">
									<Package className="h-5 w-5 text-orange-600 mt-0.5" />
									<div>
										<p className="text-sm font-medium">Material</p>
										<p className="text-sm text-muted-foreground capitalize">
											{product.material}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-2">
									<Ruler className="h-5 w-5 text-orange-600 mt-0.5" />
									<div>
										<p className="text-sm font-medium">Capacidad</p>
										<p className="text-sm text-muted-foreground">
											{product.weightCapacity}
										</p>
									</div>
								</div>

								<div className="flex items-start gap-2">
									<Palette className="h-5 w-5 text-orange-600 mt-0.5" />
									<div>
										<p className="text-sm font-medium">Colores</p>
										<p className="text-sm text-muted-foreground">
											{productColors.length} opciones
										</p>
									</div>
								</div>

								<div className="flex items-start gap-2">
									<Grid3x3 className="h-5 w-5 text-orange-600 mt-0.5" />
									<div>
										<p className="text-sm font-medium">Patrones</p>
										<p className="text-sm text-muted-foreground">
											{productPatterns.length} diseños
										</p>
									</div>
								</div>
							</div>
						</div>

						<Separator />

						{/* Botones de acción */}
						<div className="space-y-3">
							<Button
								className="w-full bg-orange-600 hover:bg-orange-700"
								size="lg"
								onClick={() => {
									if (onCustomize) {
										onCustomize(product);
										onClose();
									}
								}}
							>
								<ShoppingCart className="h-5 w-5 mr-2" />
								Personalizar y Comprar
							</Button>

							<Button
								variant="outline"
								className="w-full"
								size="lg"
								onClick={() => {
									if (onAddToCart) {
										onAddToCart(product);
										toast.success("Producto agregado al carrito");
									}
								}}
							>
								Agregar al Carrito
							</Button>
						</div>
					</div>
				</div>

				{/* Tabs de información adicional */}
				<Tabs defaultValue="reviews" className="mt-8">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="reviews">
							Reseñas ({reviews.length})
						</TabsTrigger>
						<TabsTrigger value="add-review">Escribir Reseña</TabsTrigger>
					</TabsList>

					<TabsContent value="reviews" className="space-y-6 mt-6">
						{/* Resumen de calificaciones */}
						<div className="bg-gray-50 rounded-lg p-6">
							<div className="grid md:grid-cols-2 gap-8">
								<div className="text-center">
									<p className="text-5xl mb-2">{averageRating.toFixed(1)}</p>
									<div className="flex items-center justify-center gap-1 mb-2">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`h-5 w-5 ${
													i < Math.floor(averageRating)
														? "fill-yellow-400 text-yellow-400"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>
									<p className="text-sm text-muted-foreground">
										Basado en {reviews.length} reseñas
									</p>
								</div>

								<div className="space-y-2">
									{ratingDistribution.map(({ star, count, percentage }) => (
										<div key={star} className="flex items-center gap-3">
											<span className="text-sm w-12">{star} estrellas</span>
											<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-yellow-400"
													style={{ width: `${percentage}%` }}
												></div>
											</div>
											<span className="text-sm text-muted-foreground w-8">
												{count}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Lista de reseñas */}
						<div className="space-y-6">
							{reviews.length === 0 ? (
								<div className="text-center py-12">
									<p className="text-muted-foreground">
										Aún no hay reseñas para este producto.
									</p>
									<p className="text-sm text-muted-foreground mt-2">
										¡Sé el primero en compartir tu opinión!
									</p>
								</div>
							) : (
								reviews.map((review) => (
									<div
										key={review.id}
										className="border rounded-lg p-6 space-y-3"
									>
										<div className="flex items-start justify-between">
											<div>
												<div className="flex items-center gap-2 mb-1">
													<p className="font-medium">{review.userName}</p>
													{review.verified && (
														<Badge
															variant="secondary"
															className="text-xs bg-green-100 text-green-700"
														>
															<CheckCircle2 className="h-3 w-3 mr-1" />
															Verificado
														</Badge>
													)}
												</div>
												<p className="text-sm text-muted-foreground">
													{review.date}
												</p>
											</div>

											<div className="flex items-center gap-1">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`h-4 w-4 ${
															i < review.rating
																? "fill-yellow-400 text-yellow-400"
																: "text-gray-300"
														}`}
													/>
												))}
											</div>
										</div>

										<p className="text-muted-foreground leading-relaxed">
											{review.comment}
										</p>

										<div className="flex items-center gap-4 pt-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleHelpful(review.id)}
												className="text-muted-foreground hover:text-foreground"
											>
												<ThumbsUp className="h-4 w-4 mr-1" />
												Útil {review.helpful ? `(${review.helpful})` : ""}
											</Button>
										</div>
									</div>
								))
							)}
						</div>
					</TabsContent>

					<TabsContent value="add-review" className="space-y-6 mt-6">
						<div className="max-w-2xl">
							<h3 className="text-lg mb-4">Comparte tu experiencia</h3>

							<form onSubmit={handleSubmitReview} className="space-y-6">
								{/* Nombre */}
								<div>
									<Label htmlFor="userName">
										Tu nombre <span className="text-red-500">*</span>
									</Label>
									<Input
										id="userName"
										value={newReview.userName}
										onChange={(e) =>
											setNewReview({ ...newReview, userName: e.target.value })
										}
										placeholder="Nombre completo"
										className={errors.userName ? "border-red-500" : ""}
									/>
									{errors.userName && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{errors.userName}
										</p>
									)}
								</div>

								{/* Calificación */}
								<div>
									<Label>
										Calificación <span className="text-red-500">*</span>
									</Label>
									<div className="flex items-center gap-2 mt-2">
										{[1, 2, 3, 4, 5].map((star) => (
											<button
												key={star}
												type="button"
												onClick={() =>
													setNewReview({ ...newReview, rating: star })
												}
												className="focus:outline-none"
											>
												<Star
													className={`h-8 w-8 cursor-pointer transition-colors ${
														star <= newReview.rating
															? "fill-yellow-400 text-yellow-400"
															: "text-gray-300 hover:text-yellow-300"
													}`}
												/>
											</button>
										))}
										<span className="ml-2 text-sm text-muted-foreground">
											{newReview.rating} de 5 estrellas
										</span>
									</div>
								</div>

								{/* Comentario */}
								<div>
									<Label htmlFor="comment">
										Tu reseña <span className="text-red-500">*</span>
									</Label>
									<Textarea
										id="comment"
										value={newReview.comment}
										onChange={(e) =>
											setNewReview({ ...newReview, comment: e.target.value })
										}
										placeholder="Cuéntanos sobre tu experiencia con este producto..."
										rows={5}
										className={errors.comment ? "border-red-500" : ""}
									/>
									{errors.comment && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{errors.comment}
										</p>
									)}
									<p className="text-xs text-muted-foreground mt-1">
										Mínimo 10 caracteres
									</p>
								</div>

								{/* Botón de envío */}
								<Button
									type="submit"
									className="bg-orange-600 hover:bg-orange-700"
									size="lg"
								>
									Publicar Reseña
								</Button>
							</form>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}

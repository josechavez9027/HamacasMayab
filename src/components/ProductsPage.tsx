import { useState, useMemo } from "react";
import type { Product } from "../types/product";
import { expandedProducts } from "../data/expandedProducts";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import {
	Search,
	SlidersHorizontal,
	X,
	Star,
	ShoppingCart,
	Eye,
	MessageSquare,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductDetailsModal } from "./ProductDetailsModal";

interface ProductsPageProps {
	onAddToCart: (product: Product) => void;
	onViewProduct: (product: Product) => void;
}

type SortOption =
	| "relevance"
	| "price-asc"
	| "price-desc"
	| "popularity"
	| "rating";

export function ProductsPage({
	onAddToCart,
	onViewProduct,
}: ProductsPageProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState<SortOption>("relevance");
	const [showFilters, setShowFilters] = useState(false);
	const [selectedProductForDetails, setSelectedProductForDetails] =
		useState<Product | null>(null);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

	// Filtros
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedSize, setSelectedSize] = useState<string>("all");
	const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
	const [selectedAvailability, setSelectedAvailability] =
		useState<string>("all");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

	// Filtrar productos
	const filteredProducts = useMemo(() => {
		let filtered = expandedProducts;

		// Búsqueda por texto
		if (searchQuery) {
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.description.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Filtrar por categoría
		if (selectedCategory !== "all") {
			filtered = filtered.filter((p) => p.category === selectedCategory);
		}

		// Filtrar por tamaño
		if (selectedSize !== "all") {
			filtered = filtered.filter((p) =>
				p.sizes.some((s) => s.name === selectedSize)
			);
		}

		// Filtrar por material
		if (selectedMaterial !== "all") {
			filtered = filtered.filter((p) => p.material === selectedMaterial);
		}

		// Filtrar por disponibilidad
		if (selectedAvailability !== "all") {
			filtered = filtered.filter(
				(p) => p.availability === selectedAvailability
			);
		}

		// Filtrar por rango de precio
		filtered = filtered.filter(
			(p) => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1]
		);

		// Ordenar
		switch (sortBy) {
			case "price-asc":
				filtered.sort((a, b) => a.basePrice - b.basePrice);
				break;
			case "price-desc":
				filtered.sort((a, b) => b.basePrice - a.basePrice);
				break;
			case "popularity":
				filtered.sort((a, b) => b.popularity - a.popularity);
				break;
			case "rating":
				filtered.sort((a, b) => b.rating - a.rating);
				break;
			default:
				// relevance - mantener orden original
				break;
		}

		return filtered;
	}, [
		searchQuery,
		selectedCategory,
		selectedSize,
		selectedMaterial,
		selectedAvailability,
		priceRange,
		sortBy,
	]);

	const resetFilters = () => {
		setSelectedCategory("all");
		setSelectedSize("all");
		setSelectedMaterial("all");
		setSelectedAvailability("all");
		setPriceRange([0, 10000]);
		setSearchQuery("");
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
		}).format(price);
	};

	return (
		<div className="bg-background min-h-screen">
			{/* Hero de la página de productos mejorado */}
			<div className="relative bg-gradient-to-br from-orange-700 via-red-700 to-orange-900 text-white py-20 overflow-hidden">
				{/* Imagen de fondo */}
				<div className="absolute inset-0">
					<ImageWithFallback
						src="https://images.unsplash.com/photo-1727024610952-2a51fd1b2f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwaGFtbW9jayUyMHRleHRpbGUlMjBhcnRpc2FufGVufDF8fHx8MTc2MjczNDA3NXww&ixlib=rb-4.1.0&q=80&w=1080"
						alt="Fondo hamacas artesanales"
						className="w-full h-full object-cover"
					/>
					{/* Overlay oscuro */}
					<div className="absolute inset-0 bg-black/60"></div>
					<div className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-orange-900/70 to-orange-950/85"></div>
				</div>

				{/* Patrón de fondo decorativo */}
				<div className="absolute inset-0 opacity-10">
					<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern
								id="hammock-pattern"
								x="0"
								y="0"
								width="100"
								height="100"
								patternUnits="userSpaceOnUse"
							>
								<circle cx="25" cy="25" r="2" fill="white" opacity="0.3" />
								<circle cx="75" cy="75" r="2" fill="white" opacity="0.3" />
								<circle cx="50" cy="50" r="1" fill="white" opacity="0.2" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#hammock-pattern)" />
					</svg>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<Badge className="mb-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 px-4 py-2 text-sm">
							✨ Más de 20 diseños únicos disponibles
						</Badge>
						<h1 className="text-4xl md:text-6xl mb-6">
							Catálogo de Hamacas Artesanales
						</h1>
						<p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
							Descubre nuestra colección completa tejida a mano por artesanos
							yucatecos
						</p>

						{/* Estadísticas */}
						<div className="grid grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
								<div className="text-3xl mb-1">22+</div>
								<div className="text-sm opacity-80">Productos</div>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
								<div className="text-3xl mb-1">100%</div>
								<div className="text-sm opacity-80">Artesanal</div>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
								<div className="text-3xl mb-1">4.8★</div>
								<div className="text-sm opacity-80">Calificación</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				{/* Barra de búsqueda y filtros */}
				<div className="mb-8">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
						{/* Búsqueda */}
						<div className="relative flex-1 w-full">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Buscar hamacas..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						{/* Ordenar por */}
						<div className="flex gap-4 w-full md:w-auto">
							<Select
								value={sortBy}
								onValueChange={(value: SortOption) => setSortBy(value)}
							>
								<SelectTrigger className="w-full md:w-[200px]">
									<SelectValue placeholder="Ordenar por" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="relevance">Relevancia</SelectItem>
									<SelectItem value="price-asc">
										Precio: Menor a Mayor
									</SelectItem>
									<SelectItem value="price-desc">
										Precio: Mayor a Menor
									</SelectItem>
									<SelectItem value="popularity">Popularidad</SelectItem>
									<SelectItem value="rating">Calificación</SelectItem>
								</SelectContent>
							</Select>

							<Button
								variant="outline"
								onClick={() => setShowFilters(!showFilters)}
								className="flex items-center gap-2"
							>
								<SlidersHorizontal className="h-4 w-4" />
								Filtros
							</Button>
						</div>
					</div>

					{/* Resultados */}
					<div className="flex items-center justify-between">
						<p className="text-muted-foreground">
							{filteredProducts.length} productos encontrados
						</p>
						{(searchQuery ||
							selectedCategory !== "all" ||
							selectedSize !== "all" ||
							selectedMaterial !== "all" ||
							selectedAvailability !== "all") && (
							<Button variant="ghost" size="sm" onClick={resetFilters}>
								<X className="h-4 w-4 mr-2" />
								Limpiar filtros
							</Button>
						)}
					</div>
				</div>

				<div className="grid md:grid-cols-4 gap-8">
					{/* Panel de filtros lateral */}
					<div
						className={`${
							showFilters ? "block" : "hidden"
						} md:block md:col-span-1`}
					>
						<div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
							<h3 className="text-lg mb-4">Filtros</h3>

							{/* Categoría */}
							<div className="mb-6">
								<h4 className="mb-3">Línea de Producto</h4>
								<div className="space-y-2">
									{[
										{ id: "all", name: "Todas" },
										{ id: "clásica", name: "Clásica" },
										{ id: "decorativa", name: "Decorativa" },
										{ id: "premium", name: "Premium" },
									].map((cat) => (
										<label
											key={cat.id}
											className="flex items-center cursor-pointer"
										>
											<input
												type="radio"
												name="category"
												value={cat.id}
												checked={selectedCategory === cat.id}
												onChange={(e) => setSelectedCategory(e.target.value)}
												className="mr-2"
											/>
											<span className="text-sm">{cat.name}</span>
										</label>
									))}
								</div>
							</div>

							{/* Tamaño */}
							<div className="mb-6">
								<h4 className="mb-3">Tamaño</h4>
								<div className="space-y-2">
									{[
										{ id: "all", name: "Todos" },
										{ id: "Individual", name: "Individual" },
										{ id: "Matrimonial", name: "Matrimonial" },
										{ id: "Familiar", name: "Familiar" },
									].map((size) => (
										<label
											key={size.id}
											className="flex items-center cursor-pointer"
										>
											<input
												type="radio"
												name="size"
												value={size.id}
												checked={selectedSize === size.id}
												onChange={(e) => setSelectedSize(e.target.value)}
												className="mr-2"
											/>
											<span className="text-sm">{size.name}</span>
										</label>
									))}
								</div>
							</div>

							{/* Material */}
							<div className="mb-6">
								<h4 className="mb-3">Material</h4>
								<div className="space-y-2">
									{[
										{ id: "all", name: "Todos" },
										{ id: "algodón", name: "Algodón" },
										{ id: "nylon", name: "Nylon" },
										{ id: "mezcla", name: "Mezcla" },
									].map((material) => (
										<label
											key={material.id}
											className="flex items-center cursor-pointer"
										>
											<input
												type="radio"
												name="material"
												value={material.id}
												checked={selectedMaterial === material.id}
												onChange={(e) => setSelectedMaterial(e.target.value)}
												className="mr-2"
											/>
											<span className="text-sm">{material.name}</span>
										</label>
									))}
								</div>
							</div>

							{/* Disponibilidad */}
							<div className="mb-6">
								<h4 className="mb-3">Disponibilidad</h4>
								<div className="space-y-2">
									{[
										{ id: "all", name: "Todas" },
										{ id: "en stock", name: "En Stock" },
										{ id: "bajo pedido", name: "Bajo Pedido" },
									].map((avail) => (
										<label
											key={avail.id}
											className="flex items-center cursor-pointer"
										>
											<input
												type="radio"
												name="availability"
												value={avail.id}
												checked={selectedAvailability === avail.id}
												onChange={(e) =>
													setSelectedAvailability(e.target.value)
												}
												className="mr-2"
											/>
											<span className="text-sm">{avail.name}</span>
										</label>
									))}
								</div>
							</div>

							{/* Rango de precio */}
							<div className="mb-6">
								<h4 className="mb-3">Rango de Precio</h4>
								<div className="space-y-2">
									<div className="flex gap-2">
										<Input
											type="number"
											placeholder="Mín"
											value={priceRange[0]}
											onChange={(e) =>
												setPriceRange([Number(e.target.value), priceRange[1]])
											}
											className="text-sm"
										/>
										<Input
											type="number"
											placeholder="Máx"
											value={priceRange[1]}
											onChange={(e) =>
												setPriceRange([priceRange[0], Number(e.target.value)])
											}
											className="text-sm"
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										{formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
									</p>
								</div>
							</div>

							<Button
								variant="outline"
								className="w-full"
								onClick={resetFilters}
							>
								Restablecer Filtros
							</Button>
						</div>
					</div>

					{/* Grid de productos */}
					<div className="md:col-span-3">
						{filteredProducts.length === 0 ? (
							<div className="text-center py-16">
								<p className="text-muted-foreground text-lg">
									No se encontraron productos con los filtros seleccionados.
								</p>
								<Button className="mt-4" onClick={resetFilters}>
									Ver todos los productos
								</Button>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredProducts.map((product) => (
									<div
										key={product.id}
										className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
									>
										{/* Imagen */}
										<div className="relative h-64 overflow-hidden">
											<ImageWithFallback
												src={product.images[0]}
												alt={product.name}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											{product.availability !== "en stock" && (
												<Badge className="absolute top-4 left-4 bg-orange-600 text-white">
													Bajo Pedido
												</Badge>
											)}
											<div className="absolute top-4 right-4">
												<Badge variant="secondary">{product.category}</Badge>
											</div>
										</div>

										{/* Contenido */}
										<div className="p-4">
											<h3 className="text-lg mb-2 line-clamp-1">
												{product.name}
											</h3>
											<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
												{product.description}
											</p>

											{/* Rating y reseñas */}
											<div className="flex items-center gap-2 mb-3">
												<div className="flex items-center gap-1">
													<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
													<span className="text-sm">{product.rating}</span>
												</div>
												<span className="text-xs text-muted-foreground">
													({product.reviewsCount} reseñas)
												</span>
											</div>

											{/* Especificaciones */}
											<div className="grid grid-cols-2 gap-2 mb-3 text-xs text-muted-foreground">
												<div>
													<span className="block">Material:</span>
													<span className="capitalize">{product.material}</span>
												</div>
												<div>
													<span className="block">Capacidad:</span>
													<span>{product.weightCapacity}</span>
												</div>
											</div>

											{/* Precio */}
											<div className="mb-4">
												<span className="text-2xl text-orange-600">
													{formatPrice(product.basePrice)}
												</span>
												<span className="text-sm text-muted-foreground ml-2">
													desde
												</span>
											</div>

											{/* Botones de acción */}
											<div className="flex gap-2">
												<Button
													className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
													size="sm"
													onClick={() => onAddToCart(product)}
												>
													<ShoppingCart className="h-4 w-4 mr-2" />
													Agregar
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => {
														setSelectedProductForDetails(product);
														setIsDetailsModalOpen(true);
													}}
													className="border-orange-600 text-orange-600 hover:bg-orange-50 flex-shrink-0 whitespace-nowrap"
												>
													<MessageSquare className="h-4 w-4 mr-2" />
													Detalles
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Modal de detalles del producto */}
			<ProductDetailsModal
				isOpen={isDetailsModalOpen}
				onClose={() => setIsDetailsModalOpen(false)}
				product={selectedProductForDetails}
			/>
		</div>
	);
}

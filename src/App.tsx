import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductsPage } from "./components/ProductsPage";
import { ProductCustomizer } from "./components/ProductCustomizer";
import { ShoppingCart } from "./components/ShoppingCart";
import { OffersSection } from "./components/OffersSection";
import { AboutUs } from "./components/AboutUs";
import { ContactPage } from "./components/ContactPage";
import { Footer } from "./components/Footer";
import { FloatingChat } from "./components/FloatingChat";
import { Toaster } from "./components/ui/sonner";
import type {
	Product,
	CartItem,
	ProductSize,
	ProductColor,
	ProductPattern,
} from "./types/product";

export default function App() {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState<
		"home" | "about" | "products" | "contact"
	>("home");

	// Manejar navegación por hash
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash;
			if (hash === "#nosotros") {
				setCurrentPage("about");
			} else if (hash === "#productos-catalogo") {
				setCurrentPage("products");
			} else if (hash === "#contacto") {
				setCurrentPage("contact");
			} else {
				setCurrentPage("home");
			}
		};

		// Verificar hash inicial
		handleHashChange();

		// Escuchar cambios en el hash
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const addToCart = (
		product: Product,
		selectedSize?: ProductSize,
		selectedColor?: ProductColor,
		selectedPattern?: ProductPattern,
		quantity: number = 1,
		customizations?: any
	) => {
		// Use default selections if not provided
		const size = selectedSize || product.sizes[0];
		const color = selectedColor || product.colors[0];
		const pattern = selectedPattern || product.patterns[0];

		const newItem: CartItem = {
			product,
			quantity,
			selectedSize: size,
			selectedColor: color,
			selectedPattern: pattern,
			customizations,
		};

		// Check if item with same configuration already exists
		const existingItemIndex = cartItems.findIndex(
			(item) =>
				item.product.id === product.id &&
				item.selectedSize.id === size.id &&
				item.selectedColor.id === color.id &&
				item.selectedPattern.id === pattern.id &&
				JSON.stringify(item.customizations) === JSON.stringify(customizations)
		);

		if (existingItemIndex > -1) {
			// Update quantity of existing item
			const updatedItems = [...cartItems];
			updatedItems[existingItemIndex].quantity += quantity;
			setCartItems(updatedItems);
		} else {
			// Add new item
			setCartItems([...cartItems, newItem]);
		}

		setIsCartOpen(true);
	};

	const updateCartItemQuantity = (itemIndex: number, newQuantity: number) => {
		if (newQuantity === 0) {
			removeCartItem(itemIndex);
			return;
		}

		const updatedItems = [...cartItems];
		updatedItems[itemIndex].quantity = newQuantity;
		setCartItems(updatedItems);
	};

	const removeCartItem = (itemIndex: number) => {
		const updatedItems = cartItems.filter((_, index) => index !== itemIndex);
		setCartItems(updatedItems);
	};

	const openProductCustomizer = (product: Product) => {
		setSelectedProduct(product);
		setIsCustomizerOpen(true);
	};

	const closeProductCustomizer = () => {
		setSelectedProduct(null);
		setIsCustomizerOpen(false);
	};

	const totalCartItems = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<div className="min-h-screen bg-background">
			<Header
				cartItems={totalCartItems}
				onCartClick={() => setIsCartOpen(true)}
			/>

			{currentPage === "home" ? (
				<main>
					<Hero />
					<ProductCatalog
						onAddToCart={(product) => addToCart(product)}
						onViewProduct={openProductCustomizer}
					/>
					<OffersSection />
				</main>
			) : currentPage === "products" ? (
				<ProductsPage
					onAddToCart={(product) => addToCart(product)}
					onViewProduct={openProductCustomizer}
				/>
			) : currentPage === "contact" ? (
				<ContactPage />
			) : (
				<AboutUs />
			)}

			<Footer />

			{/* Shopping Cart */}
			<ShoppingCart
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				cartItems={cartItems}
				onUpdateQuantity={updateCartItemQuantity}
				onRemoveItem={removeCartItem}
			/>

			{/* Product Customizer */}
			<ProductCustomizer
				product={selectedProduct}
				isOpen={isCustomizerOpen}
				onClose={closeProductCustomizer}
				onAddToCart={addToCart}
			/>

			{/* Floating Chat */}
			<FloatingChat />

			{/* Toaster */}
			<Toaster />
		</div>
	);
}

import { useState } from "react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import logoImage from "../assets/logohm.jpg";

interface HeaderProps {
	cartItems: number;
	onCartClick: () => void;
	onSearch?: (query: string) => void;
	showSearch?: boolean;
}

export function Header({
	cartItems,
	onCartClick,
	onSearch,
	showSearch,
}: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = () => {
		if (onSearch) {
			onSearch(searchQuery);
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white bg-background/65 backdrop-blur supports-[backdrop-filter]:bg-background/20">
			<div className="container mx-auto px-4 flex h-16 items-center justify-between">
				<a
					href="#inicio"
					onClick={(e) => {
						e.preventDefault();
						window.location.hash = "";
					}}
					className="flex items-center space-x-2 cursor-pointer"
				>
					<img src={logoImage} alt="Hamacas Mayab" className="h-10 w-auto" />
				</a>

				{/* Desktop Navigation */}
				<nav
					className="hidden md:flex items-center space-x-6 text-black dark:text-black
"
				>
					<a
						href="#inicio"
						onClick={(e) => {
							e.preventDefault();
							window.location.hash = "";
						}}
						className="hover:text-primary transition-colors text-black"
					>
						Inicio
					</a>
					<a
						href="#productos-catalogo"
						className="hover:text-primary transition-colors"
					>
						Catálogo
					</a>
					<a href="#nosotros" className="hover:text-primary transition-colors">
						Nosotros
					</a>
					<a href="#contacto" className="hover:text-primary transition-colors">
						Contacto
					</a>
				</nav>

				<div className="flex items-center space-x-4">
					{showSearch && (
						<div className="relative">
							<Input
								type="text"
								placeholder="Buscar..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pr-10"
							/>
							<Button
								variant="outline"
								size="sm"
								onClick={handleSearch}
								className="absolute right-0 top-0 h-full px-3"
							>
								<Search className="h-4 w-4" />
							</Button>
						</div>
					)}
					<Button
						variant="outline"
						size="sm"
						onClick={onCartClick}
						className="relative"
					>
						<ShoppingCart className="h-4 w-4" />
						{cartItems > 0 && (
							<Badge
								variant="destructive"
								className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
							>
								{cartItems}
							</Badge>
						)}
					</Button>

					{/* Mobile menu button */}
					<Button
						variant="ghost"
						size="sm"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-4 w-4" />
						) : (
							<Menu className="h-4 w-4" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden border-t bg-background">
					<nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
						<a
							href="#inicio"
							className="py-2 hover:text-primary transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Inicio
						</a>
						<a
							href="#productos-catalogo"
							className="py-2 hover:text-primary transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Catálogo
						</a>
						<a
							href="#nosotros"
							className="py-2 hover:text-primary transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Nosotros
						</a>
						<a
							href="#contacto"
							className="py-2 hover:text-primary transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Contacto
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}

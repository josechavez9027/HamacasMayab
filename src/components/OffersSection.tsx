import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Percent, Tag, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Offer {
	id: string;
	title: string;
	description: string;
	discount: string;
	badge: string;
	endDate: Date;
	imageUrl: string;
	buttonText: string;
}

// Ofertas definidas fuera del componente para evitar recreación
const offers: Offer[] = [
	{
		id: "1",
		title: "¡Descuento Especial de Temporada!",
		description:
			"Aprovecha hasta 30% de descuento en hamacas seleccionadas. Oferta por tiempo limitado.",
		discount: "30%",
		badge: "Oferta Especial",
		endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 días desde ahora
		imageUrl:
			"https://images.unsplash.com/photo-1664333395686-ecb0c900979f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwZGlzY291bnQlMjBzYWxlJTIwYmFubmVyfGVufDF8fHx8MTc2MjcyODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		buttonText: "Ver Ofertas",
	},
	{
		id: "2",
		title: "Envío Gratis en Compras +$2,000",
		description: "En todas las hamacas premium. Entrega directa en tu hogar.",
		discount: "GRATIS",
		badge: "Envío Incluido",
		endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
		imageUrl:
			"https://images.unsplash.com/photo-1760944171724-5342eef15cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMG1leGljYW4lMjBwYXR0ZXJuc3xlbnwxfHx8fDE3NjI3Mjg2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		buttonText: "Comprar Ahora",
	},
];

export function OffersSection() {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const currentOffer = offers[0];

	// Calcular tiempo restante
	useEffect(() => {
		const calculateTimeLeft = () => {
			const difference = currentOffer.endDate.getTime() - Date.now();

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				});
			}
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, []); // Array de dependencias vacío ya que currentOffer es estático

	const scrollToProducts = () => {
		const productsSection = document.getElementById("productos");
		if (productsSection) {
			productsSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section className="py-12 bg-gradient-to-br from-orange-50 to-red-50 text2">
			<div className="container mx-auto px-4">
				{/* Título de la sección */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full mb-4">
						<Sparkles className="h-4 w-4" />
						<span className="text-sm">Ofertas Exclusivas</span>
					</div>
					<h2 className="text-3xl md:text-4xl mb-4 text2">
						Promociones Especiales
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Aprovecha nuestras ofertas limitadas en hamacas artesanales de
						Yucatán
					</p>
				</div>

				{/* Grid de Ofertas - Diseño más compacto */}
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
					{/* Oferta 1 */}
					<div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow flex flex-col">
						<div className="relative h-48 overflow-hidden">
							<ImageWithFallback
								src={currentOffer.imageUrl}
								alt={currentOffer.title}
								className="w-full h-full object-cover scale-110"
							/>
							<div className="absolute top-3 left-3">
								<Badge className="bg-red-600 text-white hover:bg-red-700">
									<Tag className="h-3 w-3 mr-1" />
									{currentOffer.badge}
								</Badge>
							</div>
							<div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
								<div className="text-2xl text-orange-600">
									{currentOffer.discount}
								</div>
								<div className="text-xs text-muted-foreground">OFF</div>
							</div>
						</div>

						<div className="p-5 flex flex-col flex-grow">
							<h3 className="text-lg mb-2">{currentOffer.title}</h3>
							<p className="text-muted-foreground text-sm mb-4">
								{currentOffer.description}
							</p>

							{/* Contador compacto */}
							<div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
								<Clock className="h-3 w-3" />
								<span>Termina en:</span>
								<div className="flex gap-1">
									<span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
										{timeLeft.days}d
									</span>
									<span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
										{timeLeft.hours}h
									</span>
									<span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
										{timeLeft.minutes}m
									</span>
								</div>
							</div>

							<Button
								size="sm"
								className="bg-orange-600 hover:bg-orange-700 text-white w-full mt-auto"
								onClick={scrollToProducts}
							>
								{currentOffer.buttonText}
							</Button>
						</div>
					</div>

					{/* Oferta 2 */}
					{offers.slice(1).map((offer) => (
						<div
							key={offer.id}
							className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow flex flex-col"
						>
							<div className="relative h-48 overflow-hidden">
								<ImageWithFallback
									src={offer.imageUrl}
									alt={offer.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-3 left-3">
									<Badge className="bg-green-600 text-white hover:bg-green-700">
										{offer.badge}
									</Badge>
								</div>
								<div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
									<div className="text-xl text-green-600">{offer.discount}</div>
								</div>
							</div>

							<div className="p-5 flex flex-col flex-grow">
								<h3 className="text-lg mb-2">{offer.title}</h3>
								<p className="text-muted-foreground text-sm mb-4">
									{offer.description}
								</p>

								<Button
									size="sm"
									variant="outline"
									className="border-orange-600 text-orange-600 hover:bg-orange-50 w-full mt-auto"
									onClick={scrollToProducts}
								>
									{offer.buttonText}
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

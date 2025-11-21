import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import {
	Phone,
	Mail,
	MapPin,
	Clock,
	Send,
	HelpCircle,
	CheckCircle2,
	AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const validateForm = () => {
		const newErrors = {
			name: "",
			email: "",
			subject: "",
			message: "",
		};

		let isValid = true;

		// Validar nombre
		if (!formData.name.trim()) {
			newErrors.name = "El nombre es requerido";
			isValid = false;
		} else if (formData.name.trim().length < 3) {
			newErrors.name = "El nombre debe tener al menos 3 caracteres";
			isValid = false;
		}

		// Validar email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newErrors.email = "El correo electrónico es requerido";
			isValid = false;
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Ingrese un correo electrónico válido";
			isValid = false;
		}

		// Validar asunto
		if (!formData.subject.trim()) {
			newErrors.subject = "El asunto es requerido";
			isValid = false;
		}

		// Validar mensaje
		if (!formData.message.trim()) {
			newErrors.message = "El mensaje es requerido";
			isValid = false;
		} else if (formData.message.trim().length < 10) {
			newErrors.message = "El mensaje debe tener al menos 10 caracteres";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			toast.error("Por favor, corrige los errores en el formulario", {
				icon: <AlertCircle className="h-5 w-5" />,
			});
			return;
		}

		setIsSubmitting(true);

		// Simular envío del formulario
		setTimeout(() => {
			setIsSubmitting(false);
			toast.success("¡Mensaje enviado exitosamente!", {
				description: "Nos pondremos en contacto contigo pronto.",
				icon: <CheckCircle2 className="h-5 w-5" />,
			});

			// Limpiar formulario
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
			setErrors({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		}, 1500);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Limpiar error al escribir
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const faqs = [
		{
			question: "¿Cuánto tiempo tarda en llegar mi pedido?",
			answer:
				"El tiempo de entrega varía según tu ubicación. Dentro de Yucatán, los envíos toman de 3 a 5 días hábiles. Para el resto de México, de 5 a 10 días hábiles. Te enviaremos un número de rastreo para que puedas seguir tu pedido en todo momento.",
		},
		{
			question: "¿Las hamacas son tejidas a mano realmente?",
			answer:
				"Sí, todas nuestras hamacas son 100% tejidas a mano por artesanos yucatecos con técnicas ancestrales mayas. Cada hamaca requiere entre 3 y 7 días de trabajo manual, dependiendo del tamaño y complejidad del diseño. Esto garantiza la máxima calidad y autenticidad.",
		},
		{
			question: "¿Puedo personalizar mi hamaca?",
			answer:
				"¡Por supuesto! Ofrecemos múltiples opciones de personalización: tamaños (individual, matrimonial, familiar), colores (más de 20 tonos disponibles), y patrones (clásicos, rayas, diseños geométricos mayas). También puedes solicitar combinaciones de colores especiales contactándonos directamente.",
		},
		{
			question: "¿Qué capacidad de peso soportan las hamacas?",
			answer:
				"Nuestras hamacas están diseñadas para soportar diferentes capacidades según el modelo. Las hamacas clásicas soportan entre 150-160 kg, las decorativas hasta 170 kg, y nuestras hamacas premium pueden soportar hasta 300 kg. Cada producto especifica su capacidad en la descripción.",
		},
		{
			question: "¿Cómo cuido y lavo mi hamaca?",
			answer:
				"Para las hamacas de algodón, recomendamos lavar a mano con agua fría y jabón neutro. Evita usar blanqueadores. Déjala secar a la sombra, nunca en secadora. Para las hamacas de nylon, puedes lavarlas en lavadora en ciclo delicado. Un cuidado adecuado garantiza que tu hamaca dure muchos años.",
		},
		{
			question: "¿Ofrecen garantía?",
			answer:
				"Sí, todas nuestras hamacas tienen garantía de 6 meses contra defectos de fabricación. Si encuentras algún problema con el tejido o los materiales, lo reparamos o reemplazamos sin costo. La garantía no cubre desgaste normal por uso o daños por mal manejo.",
		},
		{
			question: "¿Realizan envíos internacionales?",
			answer:
				"Actualmente realizamos envíos a toda la República Mexicana. Para envíos internacionales, por favor contáctanos directamente por correo o teléfono y con gusto te proporcionaremos una cotización personalizada según tu ubicación.",
		},
		{
			question: "¿Qué métodos de pago aceptan?",
			answer:
				"Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, depósitos en OXXO, y pagos a través de PayPal. Para pedidos mayoristas, ofrecemos condiciones especiales de pago.",
		},
		{
			question: "¿Tienen tienda física?",
			answer:
				"Sí, contamos con un taller-tienda en Mérida, Yucatán, donde puedes ver y probar nuestras hamacas personalmente. También puedes conocer a los artesanos y el proceso de elaboración. Te recomendamos agendar una cita para asegurarte de que podamos atenderte adecuadamente.",
		},
		{
			question: "¿Hacen ventas al mayoreo?",
			answer:
				"Sí, manejamos ventas al mayoreo para hoteles, tiendas, y distribuidores. Ofrecemos precios especiales y condiciones preferenciales para pedidos grandes. Contáctanos por correo o teléfono para solicitar un catálogo mayorista y cotización personalizada.",
		},
	];

	return (
		<div className="bg-background min-h-screen">
			{/* Hero */}
			<section className="relative h-[300px] md:h-[350px] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<ImageWithFallback
						src="https://images.unsplash.com/photo-1656278345240-45c0b904b74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGhhbW1vY2slMjBoYW5kbWFkZSUyMHRleHRpbGV8ZW58MXx8fHwxNzYyNzM0NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
						alt="Contáctanos"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="text-center max-w-4xl mx-auto text-white">
						<h1 className="text-4xl md:text-6xl mb-6">
							<span className="text-orange-500">Contáctanos</span>
						</h1>
						<p className="text-xl md:text-2xl max-w-2xl mx-auto">
							¿Tienes preguntas? Nos encantaría saber de ti
						</p>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 py-16">
				{/* Preguntas Frecuentes */}
				<section className="mb-20">
					<div className="text-center mb-12">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
							<HelpCircle className="h-8 w-8 text-orange-600" />
						</div>
						<h2 className="text-3xl md:text-4xl mb-4">Preguntas Frecuentes</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Encuentra respuestas rápidas a las preguntas más comunes
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						<Accordion type="single" collapsible className="space-y-4">
							{faqs.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="bg-white rounded-lg shadow-sm border px-6"
								>
									<AccordionTrigger className="hover:no-underline py-5">
										<span className="text-left pr-4">{faq.question}</span>
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</section>

				{/* Formulario de Contacto e Información */}
				<section className="mb-20">
					<div className="text-center mb-12">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
							<Send className="h-8 w-8 text-orange-600" />
						</div>
						<h2 className="text-3xl md:text-4xl mb-4">Envíanos un Mensaje</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Completa el formulario y te responderemos a la brevedad
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
						{/* Formulario */}
						<div className="bg-white rounded-xl shadow-lg p-8">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Nombre */}
								<div>
									<Label htmlFor="name">
										Nombre completo <span className="text-red-500">*</span>
									</Label>
									<Input
										id="name"
										name="name"
										type="text"
										placeholder="Juan Pérez"
										value={formData.name}
										onChange={handleChange}
										className={errors.name ? "border-red-500" : ""}
									/>
									{errors.name && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{errors.name}
										</p>
									)}
								</div>

								{/* Email */}
								<div>
									<Label htmlFor="email">
										Correo electrónico <span className="text-red-500">*</span>
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="correo@ejemplo.com"
										value={formData.email}
										onChange={handleChange}
										className={errors.email ? "border-red-500" : ""}
									/>
									{errors.email && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{errors.email}
										</p>
									)}
								</div>

								{/* Asunto */}
								<div>
									<Label htmlFor="subject">
										Asunto <span className="text-red-500">*</span>
									</Label>
									<Input
										id="subject"
										name="subject"
										type="text"
										placeholder="¿En qué podemos ayudarte?"
										value={formData.subject}
										onChange={handleChange}
										className={errors.subject ? "border-red-500" : ""}
									/>
									{errors.subject && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{errors.subject}
										</p>
									)}
								</div>

								{/* Mensaje */}
								<div>
									<Label htmlFor="message">
										Mensaje <span className="text-red-500">*</span>
									</Label>
									<Textarea
										id="message"
										name="message"
										placeholder="Escribe tu mensaje aquí..."
										rows={6}
										value={formData.message}
										onChange={handleChange}
										className={errors.message ? "border-red-500" : ""}
									/>
									{errors.message && (
										<p className="text-red-500 text-sm mt-1 flex items-center gap-1">
											<AlertCircle className="h-3 w-3" />
											{errors.message}
										</p>
									)}
								</div>

								{/* Botón de envío */}
								<Button
									type="submit"
									className="w-full bg-orange-600 hover:bg-orange-700 text-white"
									size="lg"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											Enviando...
										</>
									) : (
										<>
											<Send className="h-4 w-4 mr-2" />
											Enviar Mensaje
										</>
									)}
								</Button>

								<p className="text-xs text-muted-foreground text-center">
									<span className="text-red-500">*</span> Campos obligatorios
								</p>
							</form>
						</div>

						{/* Información de Contacto */}
						<div className="space-y-6">
							{/* Dirección */}
							<div className="bg-white rounded-xl shadow-lg p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
										<MapPin className="h-6 w-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<h3 className="text-lg mb-2">Dirección</h3>
										<p className="text-muted-foreground">
											Calle 60 #450 x 51 y 53
											<br />
											Centro Histórico
											<br />
											Mérida, Yucatn, México
											<br />
											C.P. 97000
										</p>
									</div>
								</div>
							</div>

							{/* Teléfonos */}
							<div className="bg-white rounded-xl shadow-lg p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
										<Phone className="h-6 w-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<h3 className="text-lg mb-2">Teléfonos</h3>
										<p className="text-muted-foreground">
											Oficina: (999) 123-4567
											<br />
											WhatsApp: +52 999 987-6543
											<br />
											Ventas: (999) 111-2222
										</p>
									</div>
								</div>
							</div>

							{/* Email */}
							<div className="bg-white rounded-xl shadow-lg p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
										<Mail className="h-6 w-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<h3 className="text-lg mb-2">Correo Electrónico</h3>
										<p className="text-muted-foreground">
											Atención al cliente:
											<br />
											<a
												href="mailto:contacto@hamacasyucatan.com"
												className="text-orange-600 hover:underline"
											>
												contacto@hamacasyucatan.com
											</a>
											<br />
											<br />
											Ventas mayoreo:
											<br />
											<a
												href="mailto:ventas@hamacasyucatan.com"
												className="text-orange-600 hover:underline"
											>
												ventas@hamacasyucatan.com
											</a>
										</p>
									</div>
								</div>
							</div>

							{/* Horarios */}
							<div className="bg-white rounded-xl shadow-lg p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
										<Clock className="h-6 w-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<h3 className="text-lg mb-2">Horarios de Atención</h3>
										<p className="text-muted-foreground">
											Lunes a Viernes: 9:00 AM - 7:00 PM
											<br />
											Sábados: 10:00 AM - 6:00 PM
											<br />
											Domingos: 10:00 AM - 3:00 PM
											<br />
											<br />
											<span className="text-sm italic">
												* Tienda física con cita previa
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Mapa */}
				<section>
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl mb-4">Encuéntranos</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Visita nuestro taller-tienda en el corazón de Mérida
						</p>
					</div>

					<div className="max-w-5xl mx-auto">
						<div className="bg-white rounded-xl shadow-lg overflow-hidden">
							<div className="aspect-video w-full">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8449207850375!2d-89.62431492411866!3d20.96738098924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5671748c906347%3A0x39c193fb9a146f1!2sPlaza%20Grande!5e0!3m2!1ses!2smx!4v1699999999999!5m2!1ses!2smx"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Ubicación de Hamacas Yucatán"
								></iframe>
							</div>
							<div className="p-6 bg-gradient-to-r from-orange-50 to-red-50">
								<p className="text-center text-muted-foreground">
									📍 Estamos ubicados en el Centro Histórico de Mérida, Yucatán
									<br />
									<span className="text-sm">
										Te recomendamos agendar una cita para una mejor atención
									</span>
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="mt-20 text-center">
					<div className="bg-gradient-to-r from-orange-700 to-red-700 text-white rounded-2xl p-12 max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl mb-4">
							¿Listo para comprar tu hamaca?
						</h2>
						<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
							Explora nuestro catálogo completo y encuentra la hamaca perfecta
							para ti
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-white text-orange-700 hover:bg-gray-100"
								onClick={() => (window.location.hash = "#productos-catalogo")}
							>
								Ver Catálogo
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-transparent border-white text-white hover:bg-white/10"
								onClick={() => {
									window.location.hash = "";
									setTimeout(() => {
										const productsSection =
											document.getElementById("productos");
										if (productsSection) {
											productsSection.scrollIntoView({ behavior: "smooth" });
										}
									}, 100);
								}}
							>
								Ver Productos Destacados
							</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

import {
	MapPin,
	Phone,
	Mail,
	Facebook,
	Instagram,
	Twitter,
} from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-primary text-primary-foreground text-white bg-black">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
							Hamacas Mayab
						</h3>
						<p className="text-sm opacity-90 mb-4">
							Artesanías auténticas de Yucatán. Tejidas a mano con amor y
							tradición por familias artesanas que conservan técnicas
							ancestrales mayas.
						</p>
						<div className="flex space-x-3">
							<Facebook className="h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer" />
							<Instagram className="h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer" />
							<Twitter className="h-5 w-5 opacity-80 hover:opacity-100 cursor-pointer" />
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
						<ul className="space-y-2 text-sm afoot">
							<li>
								<a
									href="#inicio"
									onClick={(e) => {
										e.preventDefault();
										window.location.hash = "";
									}}
									className="opacity-80 hover:opacity-100 transition-opacity afoot"
								>
									Inicio
								</a>
							</li>
							<li>
								<a
									href="#productos-catalogo"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Catálogo
								</a>
							</li>
							<li>
								<a
									href="#nosotros"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Nosotros
								</a>
							</li>
							<li>
								<a
									href="#contacto"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Contacto
								</a>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className="font-semibold mb-4">Atención al Cliente</h4>
						<ul className="space-y-2 text-sm afoot">
							<li>
								<a
									href="#contacto"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Preguntas Frecuentes
								</a>
							</li>
							<li>
								<a
									href="#contacto"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Guía de Tallas
								</a>
							</li>
							<li>
								<a
									href="#contacto"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Envíos y Devoluciones
								</a>
							</li>
							<li>
								<a
									href="#contacto"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Garantía
								</a>
							</li>
							<li>
								<a
									href="#nosotros"
									className="opacity-80 hover:opacity-100 transition-opacity"
								>
									Política de Calidad
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="font-semibold mb-4">Contacto</h4>
						<div className="space-y-3 text-sm">
							<div className="flex items-start gap-2">
								<MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
								<span className="opacity-80">
									Dirección
									<br />
									Mérida, Yucatán, México
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								<span className="opacity-80">+52 999 999 9999</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								<span className="opacity-80">info@HamacasMayab.com</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
					<p>
						&copy; 2025 Nombre de la empresa. Todos los derechos reservados.
					</p>
					<p className="mt-2">Hecho con ❤️ en Yucatán, México</p>
				</div>
			</div>
		</footer>
	);
}

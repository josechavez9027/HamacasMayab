import {
  Heart,
  Target,
  Eye,
  Sparkles,
  ShieldCheck,
  Handshake,
  Globe,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function AboutUs() {
  const values = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Autenticidad",
      description:
        "Cada hamaca es elaborada por manos artesanas, conservando técnicas tradicionales.",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Comercio justo",
      description:
        "Revalorizamos el trabajo artesanal garantizando un pago digno y directo a los productores.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Cultura viva",
      description:
        "Promovemos el respeto y difusión de la herencia cultural maya.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Confianza y calidad",
      description: "Ofrecemos productos genuinos, seguros y duraderos.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Responsabilidad",
      description: "Actuamos de manera ética, transparente y sostenible.",
    },
  ];

  const qualityPrinciples = [
    {
      title: "Excelencia artesanal",
      description:
        "Cada hamaca es elaborada con materiales seleccionados y bajo técnicas tradicionales que aseguran resistencia, confort y belleza en cada pieza.",
    },
    {
      title: "Satisfacción del cliente",
      description:
        "Escuchamos, atendemos y superamos las expectativas de nuestros clientes ofreciendo una experiencia de compra en línea segura, confiable y transparente.",
    },
    {
      title: "Mejora continua",
      description:
        "Evaluamos de forma constante nuestros procesos, servicios y canales de atención, buscando optimizar la eficiencia, la calidad y la atención personalizada.",
    },
    {
      title: "Compromiso social",
      description:
        "Promovemos un modelo de comercio justo que beneficie directamente a los artesanos, fomentando el desarrollo sostenible de sus comunidades.",
    },
    {
      title: "Autenticidad y transparencia",
      description:
        "Garantizamos que cada producto comercializado proviene de productores legítimos, conservando la esencia cultural y artesanal de la región maya.",
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1718703357717-eb7c03f1a77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5dWNhdGFuJTIwYXJ0aXNhbiUyMHdlYXZpbmd8ZW58MXx8fHwxNzYyNzI5MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Artesanos tejiendo hamacas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl mb-4">Quiénes Somos</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Preservando la tradición artesanal maya desde Yucatán
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center mb-8">
              Hamacas Mayab
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                En <strong className="text-foreground">Hamacas Mayab</strong>,
                somos una empresa orgullosamente yucateca dedicada a preservar y
                compartir una de las tradiciones más representativas de nuestra
                cultura: el arte del tejido artesanal de hamacas mayas.
              </p>
              <p className="text-lg leading-relaxed">
                Nacimos con la misión de conectar el trabajo de talentosos
                artesanos de la Península de Yucatán con el mundo, mediante una
                plataforma digital moderna, segura y accesible que impulsa el
                comercio justo, la identidad cultural y la economía local.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Esencia con imagen */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full mb-6">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Nuestra Esencia</span>
                </div>
                <h2 className="text-3xl md:text-4xl mb-6">
                  Arte que Cuenta Historias
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cada hamaca que ofrecemos es mucho más que un producto: es una
                  obra artesanal que refleja historia, creatividad y pasión.
                  Nuestros artesanos, herederos de técnicas mayas milenarias,
                  elaboran cada pieza a mano con materiales de alta calidad,
                  combinando comodidad, durabilidad y arte en un solo producto.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1743913222444-791cf751cde3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwYXJ0aXNhbiUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MjcyOTEzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Taller artesanal"
                  className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-600">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full mb-6">
                <Target className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-2xl md:text-3xl mb-4">💛 Nuestra Misión</h3>
              <p className="text-muted-foreground leading-relaxed">
                Impulsar el desarrollo económico y social de las comunidades
                artesanas yucatecas, promoviendo el comercio justo y la
                digitalización de sus ventas, para que su trabajo sea valorado y
                reconocido a nivel nacional e internacional.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-6">
                <Eye className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-2xl md:text-3xl mb-4">🌎 Nuestra Visión</h3>
              <p className="text-muted-foreground leading-relaxed">
                Convertirnos en la tienda en línea líder en la venta de hamacas
                artesanales auténticas, reconocida por su compromiso con la
                calidad, la sostenibilidad y la preservación de la cultura maya.
                Buscamos que cada hogar, dentro y fuera de México, conozca y
                disfrute del arte del descanso yucateco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-600 hover:bg-orange-700 text-white">
              🤝 Lo que nos define
            </Badge>
            <h2 className="text-3xl md:text-4xl mb-4">Nuestros Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en Hamacas Mayab
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 text-orange-600">
                  {value.icon}
                </div>
                <h4 className="text-xl mb-3">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Política de Calidad */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">
                Política de Calidad
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                En Hamacas Mayab, estamos comprometidos con ofrecer productos
                artesanales auténticos, de alta calidad y elaborados bajo
                estándares que garantizan la satisfacción total de nuestros
                clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {qualityPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl shadow-md border border-orange-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg mb-2">{principle.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-orange-600 hover:bg-orange-700 text-white">
                📍 Encuéntranos
              </Badge>
              <h2 className="text-3xl md:text-4xl mb-4">
                Visítanos en Mérida
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estamos ubicados en el corazón de la ciudad blanca, listos para
                atenderte
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Información de contacto */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl mb-6">Información de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="mb-1">Dirección</h4>
                      <p className="text-muted-foreground">
                        Calle 60 No. 345 x 43 y 45
                        <br />
                        Centro Histórico
                        <br />
                        Mérida, Yucatán, México
                        <br />
                        C.P. 97000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="mb-1">Teléfono</h4>
                      <p className="text-muted-foreground">
                        +52 (999) 123-4567
                        <br />
                        WhatsApp: +52 999 765-4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="mb-1">Correo Electrónico</h4>
                      <p className="text-muted-foreground">
                        contacto@hamacasmayab.com
                        <br />
                        ventas@hamacasmayab.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="mb-1">Horarios de Atención</h4>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 AM - 7:00 PM
                        <br />
                        Sábados: 10:00 AM - 5:00 PM
                        <br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Contactar por WhatsApp
                  </Button>
                </div>
              </div>

              {/* Mapa */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="relative w-full h-full min-h-[400px] bg-gray-200 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1518922427853-c8de1299ada0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJpZGElMjB5dWNhdGFuJTIwc3RyZWV0fGVufDF8fHx8MTc2MjcyOTEzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Ubicación en Mérida, Yucatán"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <span>Centro Histórico de Mérida</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  A solo 3 cuadras de la Plaza Grande
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            ¿Listo para disfrutar del descanso yucateco?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Descubre nuestra colección de hamacas artesanales y apoya el trabajo
            de nuestros talentosos artesanos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={() => {
                const productsSection = document.getElementById("productos");
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: "smooth" });
                }
                window.location.hash = "";
              }}
            >
              Ver Productos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Contactar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
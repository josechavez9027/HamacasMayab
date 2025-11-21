import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1634654445767-e551d2e2b8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGhhbW1vY2slMjBvdXRkb29yJTIwcmVsYXhpbmd8ZW58MXx8fHwxNzYyNzM0NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1727024610952-2a51fd1b2f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1leGljYW4lMjBoYW1tb2NrJTIwd292ZW58ZW58MXx8fHwxNzYyNzM0NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1634675381350-7b92c15096ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhhbW1vY2slMjBzdW5zZXQlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjI3MzQ1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1595595175455-740365521cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwdGV4dGlsZSUyMGhhbW1vY2slMjBoYW5kbWFkZXxlbnwxfHx8fDE3NjI3MzQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambiar imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToProducts = () => {
    const productsSection =
      document.getElementById("productos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPersonalizar = () => {
    const productosSection =
      document.getElementById("productos");
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <ImageWithFallback
              src={image}
              alt={`Hamacas artesanales ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hamacas Artesanales de Yucatán
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Tradición que descansa contigo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={scrollToProducts}
            >
              Ver Productos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-orange-500 hover:bg-white hover:text-black "
              onClick={scrollToPersonalizar}
            >
              Personalizar mi Hamaca
            </Button>
          </div>
        </div>
      </div>
      
      {/* Indicadores del carrusel */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
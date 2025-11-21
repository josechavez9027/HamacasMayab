import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Bienvenido a Hamacas Mayab. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simular respuesta automática
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("precio") || message.includes("costo") || message.includes("cuanto")) {
      return "Nuestras hamacas tienen precios que van desde $800 hasta $2,500 MXN dependiendo del tamaño y personalización. ¿Te gustaría ver nuestro catálogo completo?";
    }
    
    if (message.includes("envio") || message.includes("envío") || message.includes("entrega")) {
      return "Realizamos envíos a toda la República Mexicana. El tiempo de entrega es de 5-7 días hábiles. ¿A qué ciudad necesitas el envío?";
    }
    
    if (message.includes("personalizar") || message.includes("colores") || message.includes("tamaño")) {
      return "¡Todas nuestras hamacas son personalizables! Puedes elegir colores, tamaños y patrones. Visita nuestro catálogo para ver todas las opciones disponibles.";
    }
    
    if (message.includes("hola") || message.includes("buenos") || message.includes("buenas")) {
      return "¡Hola! ¿En qué puedo ayudarte con nuestras hamacas artesanales?";
    }
    
    if (message.includes("contacto") || message.includes("teléfono") || message.includes("telefono") || message.includes("whatsapp")) {
      return "Puedes contactarnos al (999) 123-4567 o escribirnos a info@hamacasmayab.com. También puedes visitar nuestra página de contacto para más información.";
    }

    if (message.includes("gracias")) {
      return "¡Con gusto! Estamos aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?";
    }
    
    return "Gracias por tu mensaje. Para más información específica, por favor visita nuestra sección de contacto o llámanos al (999) 123-4567. ¿Hay algo más en lo que pueda ayudarte?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-orange-600 hover:bg-orange-700 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] h-[500px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Chat de Hamacas Mayab</h3>
                <p className="text-xs opacity-90">Respuesta automática</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-orange-600 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-orange-100"
                        : "text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

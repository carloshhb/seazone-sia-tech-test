import { useEffect, useState } from "react";

const MESSAGES = [
  "Iniciando integração com a Sia...",
  "Analisando localização e arredores...",
  "Validando cadastro de corretor no banco...",
  "Extraindo área e valor sugerido...",
  "Calculando viabilidade por m²...",
  "Finalizando veredito de expansão...",
];

export function TypewriterText() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = MESSAGES[currentMessageIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));

          if (displayText.length === currentFullText.length) {
            setTimeout(() => setIsDeleting(true), 1100);
          }
        } else {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));

          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
          }
        }
      },
      isDeleting ? 30 : 50,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentMessageIndex]);

  return (
    <div className="flex items-center gap-1 h-6">
      <span className="text-sm font-medium text-muted-foreground transition-all">
        {displayText}
      </span>
      <span className="w-1 h-4 bg-primary animate-pulse" />
    </div>
  );
}

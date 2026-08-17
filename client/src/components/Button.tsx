import { useState, type ReactNode } from "react";
import "../App.css";

interface ButtonProps {
  contenu: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // L'interface pour définir les types inclus dans un bouton
}

export function Button({ contenu, onClick, type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="button-app">
      {contenu}
    </button>
  );
}
